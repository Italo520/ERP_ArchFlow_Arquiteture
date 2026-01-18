'use client';

import React, { useState, useOptimistic } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, horizontalListSortingStrategy, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { updateTaskStage } from '@/actions/task';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Sortable Item (Task Card)
function TaskCard({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id, data: { type: 'Task', task } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="group bg-white dark:bg-[#1a202c] rounded-xl border-t-2 border-primary overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-grab active:cursor-grabbing">
            <div className="p-4 flex flex-col flex-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{task.title}</h4>
                {task.priority && (
                    <div className="flex items-center text-xs text-gray-500 dark:text-text-secondary mt-1 mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                            task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                            {task.priority}
                        </span>
                    </div>
                )}
                {task.assignee && (
                    <div className="mt-auto pt-3 border-t border-gray-100 dark:border-border-dark flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">{task.assignee.fullName?.charAt(0)}</div>
                            <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[100px]">{task.assignee.fullName}</span>
                        </div>
                        {task.dueDate && (
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Entrega</span>
                                <span className="text-xs font-medium text-slate-700 dark:text-gray-300">
                                    {format(new Date(task.dueDate), "dd MMM yyyy", { locale: ptBR })}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Droppable Column
function KanbanColumn({ stage, tasks }) {
    const { setNodeRef } = useSortable({ id: stage.id, data: { type: 'Column', stage } });

    return (
        <div ref={setNodeRef} className="w-80 flex-shrink-0 flex flex-col bg-gray-50 dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-border-dark h-full max-h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border-dark sticky top-0 bg-gray-50 dark:bg-surface-dark z-10 rounded-t-xl">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{stage.name}</h3>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary">{tasks.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[100px]">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default function KanbanBoard({ project }) {
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Initial state from props
    // In a real app with useOptimistic, we would wrap this. 
    // For simplicity, we trigger server action and rely on revalidation or local state update.
    // Let's use local state for immediate feedback + server action.
    const [stages, setStages] = useState(project.stages);

    // Helper to find task by id
    const findTask = (id) => {
        for (const stage of stages) {
            const task = stage.tasks.find(t => t.id === id);
            if (task) return task;
        }
        return null;
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Find source and destination details
        let sourceStage = stages.find(s => s.tasks.some(t => t.id === activeId));
        let destStage = stages.find(s => s.id === overId) || stages.find(s => s.tasks.some(t => t.id === overId));

        if (!sourceStage || !destStage) return;

        if (sourceStage.id !== destStage.id) {
            // Moved to another column
            const task = sourceStage.tasks.find(t => t.id === activeId);

            // Optimistic update
            setStages(prev => prev.map(stage => {
                if (stage.id === sourceStage.id) {
                    return { ...stage, tasks: stage.tasks.filter(t => t.id !== activeId) };
                }
                if (stage.id === destStage.id) {
                    return { ...stage, tasks: [...stage.tasks, { ...task, stageId: destStage.id }] };
                }
                return stage;
            }));

            // Server Action
            try {
                await updateTaskStage(activeId, destStage.id, project.id);
            } catch (error) {
                console.error("Failed to move task", error);
                // Revert would happen here
            }
        }
    };

    const activeTask = activeId ? findTask(activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
                <header className="h-16 flex-none bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-6 lg:px-10">
                    <div className="flex flex-col">
                        <Link href="/dashboard" className="text-xs text-gray-500 hover:text-primary mb-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                            Voltar para Dashboard
                        </Link>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
                    </div>
                </header>

                <div className="flex-1 flex overflow-x-auto p-6 gap-6 h-full items-start">
                    {stages.map(stage => (
                        <KanbanColumn key={stage.id} stage={stage} tasks={stage.tasks} />
                    ))}
                </div>
            </div>
            <DragOverlay>
                {activeTask ? <div className="opacity-80"><TaskCard task={activeTask} /></div> : null}
            </DragOverlay>
        </DndContext>
    );
}
