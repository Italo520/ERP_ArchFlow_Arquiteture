import React from 'react';
import { listProjects } from '@/app/actions/project';
import ProjectsView from '@/components/projects/ProjectsView';

export default async function ProjectsPage({ searchParams }: { searchParams: { q?: string; status?: string; clientId?: string } }) {
    const filters = {
        clientId: searchParams.clientId,
        status: searchParams.status === 'ALL' ? undefined : searchParams.status
    };

    const result = await listProjects(filters);
    let projects = result.success ? result.data || [] : [];

    // Client-side search refinement for MVP
    if (searchParams.q) {
        const q = searchParams.q.toLowerCase();
        projects = projects.filter((p: any) => p.name.toLowerCase().includes(q));
    }

    return (
        <ProjectsView projects={projects} />
    );
}
