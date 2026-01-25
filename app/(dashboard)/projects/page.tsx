import React from 'react';
import { listProjects } from '@/app/actions/project';
import ProjectsView from '@/components/projects/ProjectsView';

export default async function ProjectsPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; status?: string; clientId?: string }>
}) {
    const sp = await searchParams;
    const filters = {
        clientId: sp.clientId,
        status: sp.status === 'ALL' ? undefined : sp.status
    };

    const result = await listProjects(filters);
    let projects = result.success ? result.data || [] : [];

    // Client-side search refinement for MVP
    if (sp.q) {
        const q = sp.q.toLowerCase();
        projects = projects.filter((p: any) => p.name.toLowerCase().includes(q));
    }

    return (
        <ProjectsView projects={projects} />
    );
}
