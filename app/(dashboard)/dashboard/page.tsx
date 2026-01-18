import React from 'react';
import { getUserProjects } from '@/actions/project';
import ProjectList from '@/components/dashboard/ProjectList';
import Link from 'next/link';

export default async function Dashboard() {
    const projects = await getUserProjects();

    return (
        <div className="p-6 lg:p-10 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Meus Projetos</h1>
                    <p className="text-slate-500 dark:text-[#95c6a9] text-base font-normal leading-normal max-w-2xl">
                        Gerencie todos os seus projetos e acompanhe o progresso em tempo real.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/projects/new" className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-[#122118] text-sm font-bold hover:bg-[#1bc65f] transition-colors shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined mr-2 text-[18px]">add</span>
                        <span>Novo Projeto</span>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <ProjectList projects={projects} />
        </div>
    );
}
