'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';

export function KanbanColumn({ stage, tasks }) {
    const { setNodeRef } = useSortable({
        id: stage.id,
        data: { type: 'Column', stage }
    });

    return (
        <div
            ref={setNodeRef}
            className="w-80 flex-shrink-0 flex flex-col bg-gray-50/80 dark:bg-surface-dark rounded-xl border border-gray-200/60 dark:border-border-dark h-full max-h-full mr-4"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-border-dark bg-transparent rounded-t-xl">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{stage.name}</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-sm">
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col min-h-[100px] gap-1">
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}
