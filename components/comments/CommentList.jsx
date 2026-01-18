
import { useEffect, useState } from 'react';
import { commentService } from '../../services/comment.service';
import CommentEditor from './CommentEditor';
import { useWebSocket } from '../../hooks/useWebSocket';

const CommentList = ({ taskId, projectId }) => {
    const [comments, setComments] = useState([]);

    // Mocking available users for mentions - in real app fetch from project service
    const availableUsers = [
        { id: '1', name: 'Italo' },
        { id: '2', name: 'Maria' },
        { id: '3', name: 'Joao' }
    ];

    // Load initial comments
    useEffect(() => {
        commentService.getComments(taskId).then(setComments).catch(console.error);
    }, [taskId]);

    // WebSocket subscription - Temporarily disabled
    // useWebSocket(`/topic/tasks/${taskId}/comments`, (newComment) => {
    //    setComments((prev) => [...prev, newComment]);
    // });

    const handleAddComment = async (richText) => {
        try {
            // Optimistic update could be done here, but WS will handle it
            await commentService.addComment(taskId, richText);
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    };

    return (
        <div className="flex flex-col gap-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Comments ({comments.length})</h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                            {comment.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm">{comment.userName}</span>
                                <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-gray-700 prose prose-sm" dangerouslySetInnerHTML={{ __html: comment.richText }} />
                        </div>
                    </div>
                ))}

                {comments.length === 0 && (
                    <p className="text-gray-400 text-sm italic">No comments yet.</p>
                )}
            </div>

            <CommentEditor onSubmit={handleAddComment} availableUsers={availableUsers} />
        </div>
    );
};

export default CommentList;
