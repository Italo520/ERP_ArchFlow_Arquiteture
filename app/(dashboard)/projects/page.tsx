import React from 'react';
import { listProjects } from '@/app/actions/project';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectsTable from '@/components/projects/ProjectsTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ProjectsPage({ searchParams }: { searchParams: { q?: string; status?: string; clientId?: string } }) {
    // Note: listProjects needs to support these new filters if we want server-side filtering.
    // Ideally we update listProjects to accept a search term and more status.
    const filters = {
        clientId: searchParams.clientId,
        status: searchParams.status === 'ALL' ? undefined : searchParams.status
    };

    const result = await listProjects(filters);
    let projects = result.success ? result.data || [] : [];

    // Client-side search for MVP if not in API
    if (searchParams.q) {
        const q = searchParams.q.toLowerCase();
        projects = projects.filter((p: any) => p.name.toLowerCase().includes(q));
    }

    return (
        <div className="p-6 lg:p-10 max-w-[1400px] mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Projetos</h1>
                    <p className="text-slate-500 dark:text-[#95c6a9] text-base font-normal leading-normal max-w-2xl">
                        Gerencie seus projetos arquitetônicos, fases e cronogramas.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/projects/new">
                        <Button className="font-bold shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined mr-2 text-[18px]">add</span>
                            Novo Projeto
                        </Button>
                    </Link>
                </div>
            </div>

            <ProjectFilters />
            <ProjectsTable projects={projects} />
        </div>
    );
}
