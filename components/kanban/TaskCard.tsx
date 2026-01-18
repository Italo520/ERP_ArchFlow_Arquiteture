'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function TaskCard({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
        data: { type: 'Task', task }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const metadata = task.metadata && typeof task.metadata === 'object' ? task.metadata : {};

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group bg-white dark:bg-[#1a202c] rounded-xl border-t-2 border-primary overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-grab active:cursor-grabbing mb-3"
        >
            <div className="p-3 flex flex-col flex-1 gap-2">
                <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{task.title}</h4>
                </div>

                {/* Tags / Priority / Metadata Row */}
                <div className="flex flex-wrap items-center gap-2">
                    {task.priority && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${task.priority === 'HIGH' ? 'bg-red-50 text-red-600 border border-red-100' :
                                task.priority === 'MEDIUM' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                    'bg-green-50 text-green-600 border border-green-100'
                            }`}>
                            {task.priority === 'HIGH' ? 'Alta' : task.priority === 'MEDIUM' ? 'Média' : 'Baixa'}
                        </span>
                    )}

                    {metadata.area && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                            {metadata.area}m²
                        </span>
                    )}
                </div>

                {/* Footer: Assignee & Date */}
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {task.assignee ? (
                            <div className="flex items-center gap-1.5" title={task.assignee.fullName}>
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/20">
                                    {task.assignee.fullName?.charAt(0)}
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[80px]">
                                    {task.assignee.fullName.split(' ')[0]}
                                </span>
                            </div>
                        ) : (
                            <span className="text-[10px] text-slate-400 italic">...</span>
                        )}
                    </div>

                    {task.dueDate && (
                        <div className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${new Date(task.dueDate) < new Date() ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}>
                            <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                            {format(new Date(task.dueDate), "dd/MM", { locale: ptBR })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
