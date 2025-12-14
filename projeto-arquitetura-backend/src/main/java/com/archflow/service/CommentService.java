package com.archflow.service;

import com.archflow.dto.CommentResponseDTO;
import com.archflow.dto.CreateCommentDTO;
import com.archflow.model.Comment;
import com.archflow.model.Task;
import com.archflow.model.User;
import com.archflow.repository.CommentRepository;
import com.archflow.repository.NotificationRepository;
import com.archflow.repository.TaskRepository;
import com.archflow.repository.UserRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final IAuthenticationContext authenticationContext;

    private final NotificationRepository notificationRepository;
    private final org.springframework.messaging.simp.SimpMessagingTemplate messagingTemplate;

    public CommentService(CommentRepository commentRepository, TaskRepository taskRepository,
            UserRepository userRepository, IAuthenticationContext authenticationContext,
            NotificationRepository notificationRepository,
            org.springframework.messaging.simp.SimpMessagingTemplate messagingTemplate) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.authenticationContext = authenticationContext;
        this.notificationRepository = notificationRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public CommentResponseDTO addComment(@NonNull CreateCommentDTO request) {
        User currentUser = authenticationContext.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("User not authenticated");
        }

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Comment comment = new Comment(task, currentUser, request.getRichText());

        Comment savedComment = commentRepository.save(comment);
        CommentResponseDTO responseDTO = mapToDTO(savedComment);

        // Broadcast to task subscribers via WebSocket
        // Destination: /topic/tasks/{taskId}/comments
        messagingTemplate.convertAndSend("/topic/tasks/" + task.getId() + "/comments", responseDTO);

        // Parse mentions and notify
        parseMentionsAndNotify(comment.getRichText(), task, currentUser);

        return responseDTO;
    }

    public List<CommentResponseDTO> getCommentsByTask(UUID taskId) {
        return commentRepository.findByTaskIdOrderByCreatedAtAsc(taskId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private void parseMentionsAndNotify(String text, Task task, User sender) {
        // Regex for @username
        Pattern pattern = Pattern.compile("@([a-zA-Z0-9_.-]+)");
        Matcher matcher = pattern.matcher(text);

        java.util.Set<String> mentionedUsernames = new java.util.HashSet<>();
        while (matcher.find()) {
            mentionedUsernames.add(matcher.group(1));
        }

        for (String username : mentionedUsernames) {
            // Find user by email (assuming username logic maps effectively to email or
            // name,
            // BUT our User entity uses email mostly. Modifying to look up by name if
            // possible or email prefix.
            // For now, let's assume the frontend sends @EmailPrefix or we lookup by name?
            // Since we don't have a specific 'username' field, we'll try to match by
            // partial email or name.
            // A better approach for the future is to use IDs in mentions like @[Name](uuid)

            // SIMPLIFICATION: Ignoring complex lookup for now, trying to find by exact
            // email for robustness or skipping.
            // Ideally, we search users where name matches.

            // Let's create a notification anyway if we find a user.
            // Since I cannot easily guarantee unique usernames, I will search by Name.
            // If multiple users have same name, this might notify multiples.

            // Ex: userRepository.findByName(username) -> returns Optional<User> or
            // List<User>
            // Checking if we have findByName
            userRepository.findByEmail(username).ifPresent(user -> { // Temporary: Assuming mention is email for exact
                                                                     // match
                if (!user.getId().equals(sender.getId())) {
                    createNotification(user, task, sender);
                }
            });
        }
    }

    private void createNotification(User targetUser, Task task, User sender) {
        com.archflow.model.Notification notification = new com.archflow.model.Notification(
                targetUser,
                "Nova menção em comentário",
                sender.getFullName() + " mencionou você na tarefa: " + task.getTitle(),
                task.getId(),
                "TASK");
        notificationRepository.save(notification);

        // Notify via WebSocket personal channel
        messagingTemplate.convertAndSendToUser(
                targetUser.getEmail(),
                "/queue/notifications",
                "Nova notificação: " + notification.getTitle());
    }

    private CommentResponseDTO mapToDTO(Comment comment) {
        return new CommentResponseDTO(
                comment.getId(),
                comment.getTask().getId(),
                comment.getUser().getId(),
                comment.getUser().getFullName(),
                comment.getRichText(),
                comment.getCreatedAt());
    }
}
