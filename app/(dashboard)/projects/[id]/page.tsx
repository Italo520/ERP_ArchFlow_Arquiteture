import React from 'react';
import { getProjectById } from '@/actions/project';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }) {
    const { id } = await params;

    // Fetch project with stages and tasks
    const project = await getProjectById(id);

    if (!project) {
        return notFound();
    }

    return (
        <div className="h-full flex flex-col">
            <KanbanBoard project={project} />
        </div>
    );
}
