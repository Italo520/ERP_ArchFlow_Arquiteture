'use client';

import React, { useState, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
    arrayMove,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { updateTaskPositions } from '@/actions/task';
import Link from 'next/link';
import { KanbanColumn } from './Column';
import { TaskCard } from './TaskCard';

const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

export default function KanbanBoard({ project }) {
    const [stages, setStages] = useState(project.stages);
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const findStage = (id) => {
        const stage = stages.find(s => s.id === id);
        if (stage) return stage;
        return stages.find(s => s.tasks.some(t => t.id === id));
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const task = stages.flatMap(s => s.tasks).find(t => t.id === active.id);
        setActiveTask(task);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeStage = findStage(activeId);
        const overStage = findStage(overId);

        if (!activeStage || !overStage || activeStage === overStage) return;

        setStages((prev) => {
            const activeStageIndex = prev.findIndex(s => s.id === activeStage.id);
            const overStageIndex = prev.findIndex(s => s.id === overStage.id);

            const newStages = [...prev];
            const activeContainer = newStages[activeStageIndex];
            const overContainer = newStages[overStageIndex];

            const activeTaskIndex = activeContainer.tasks.findIndex(t => t.id === activeId);
            const overTaskIndex = overContainer.tasks.findIndex(t => t.id === overId);

            let newIndex;
            if (overId === overStage.id) {
                newIndex = overContainer.tasks.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overTaskIndex >= 0 ? overTaskIndex + modifier : overContainer.tasks.length + 1;
            }

            // Remove from source
            const [movedTask] = activeContainer.tasks.splice(activeTaskIndex, 1);
            // Add to dest
            movedTask.stageId = overStage.id; // Update local stageId reference
            overContainer.tasks.splice(newIndex, 0, movedTask);

            return newStages;
        });
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeStage = findStage(activeId);
        const overStage = findStage(overId);

        if (activeStage && overStage) {
            const activeStageIndex = stages.findIndex(s => s.id === activeStage.id);
            const overStageIndex = stages.findIndex(s => s.id === overStage.id);

            const activeIndex = stages[activeStageIndex].tasks.findIndex(t => t.id === activeId);
            const overIndex = stages[overStageIndex].tasks.findIndex(t => t.id === overId);

            let newStages = [...stages];

            if (activeStage.id === overStage.id && activeIndex !== overIndex) {
                // Same column reorder
                newStages[activeStageIndex].tasks = arrayMove(newStages[activeStageIndex].tasks, activeIndex, overIndex);
                setStages(newStages);
            }
            // If cross column, DragOver handled formatting 'stages', DragEnd just confirms generic state?
            // Actually relying on DragOver to mutate state for cross-column is tricky because DragEnd uses 'stages' closure state.
            // But since handleDragOver updates state, handleDragEnd receives the UPDATED state if it reads it from scope?
            // No, handleDragEnd 'stages' might be stale? No, it's a closure. 
            // Better to re-find in 'stages' from state if needed, or rely on the final updated state.
            // But standard dnd-kit practice: DragOver manages the 'visual' transfer. DragEnd calls the API.

            // To effectively save: we iterate through the 'stages' state (which should be final layout)
            // and send all positions.
        }

        // Persist Changes
        const updates = [];
        stages.forEach(stage => {
            stage.tasks.forEach((task, index) => {
                updates.push({
                    id: task.id,
                    position: index,
                    stageId: stage.id
                });
            });
        });

        // We execute update even if visual didn't change just to be safe, or check dirty text.
        // Optimization: only update if needed.
        await updateTaskPositions(project.id, updates);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
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

                <div className="flex-1 flex overflow-x-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 items-start">
                    {stages.map(stage => (
                        <KanbanColumn key={stage.id} stage={stage} tasks={stage.tasks} />
                    ))}
                </div>
            </div>
            <DragOverlay dropAnimation={dropAnimation}>
                {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
