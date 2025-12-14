

import { useState, useEffect } from 'react';
import CommentList from '../comments/CommentList';
import TaskService from '../../services/task.service';

const TaskDetailsDialog = ({ taskId, onClose }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch full task details if needed, or if passed as prop. 
        // Assuming we need to fetch to get latest including fields not on summary card
        const fetchTask = async () => {
            // Mock or real service call. Assuming TaskService has getTaskById (it might retrieve from list or API)
            // If TaskService.getTaskById doesn't exist, I need to check TaskService.
            try {
                // Temporary: Fetch/Find task logic. 
                // Since I can't easily see TaskService internals right this moment, I'm assuming a simple fetch or relying on what I add.
                // Assuming I can add getById to TaskService if missing.
                const data = await TaskService.getTaskById(taskId);
                setTask(data);
            } catch (e) {
                console.error("Failed to load task details", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [taskId]);

    if (!task && !loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b dark:border-neutral-800">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{loading ? 'Loading...' : task?.title}</h2>
                        <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {task?.priority}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                    >
                        ✕
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center py-8">Loading details...</div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {task?.description || "No description provided."}
                                </p>
                            </div>

                            <hr className="border-gray-100 dark:border-neutral-800" />

                            {/* Comments Section */}
                            <div>
                                <CommentList taskId={taskId} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsDialog;
