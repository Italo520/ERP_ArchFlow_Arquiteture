'use client';

import React from 'react';
import Link from 'next/link';

export default function ProjectList({ projects }) {
    if (!projects || projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-[#254632] rounded-xl border border-gray-100 dark:border-none shadow-sm">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">folder_off</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Nenhum projeto encontrado</h3>
                <p className="text-gray-500 dark:text-gray-300 text-center mb-6 max-w-sm">
                    Você ainda não tem projetos criados. Comece criando seu primeiro projeto agora mesmo.
                </p>
                <Link href="/projects/new" className="px-6 py-2 bg-primary text-[#122118] font-bold rounded-lg hover:bg-[#1bc65f] transition-colors">
                    Criar Projeto
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id} className="group">
                    <div className="bg-white dark:bg-[#254632] rounded-xl border border-gray-100 dark:border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                        <div className={`h-40 w-full bg-cover bg-center ${!project.imageUrl ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            style={{ backgroundImage: project.imageUrl ? `url('${project.imageUrl}')` : 'none' }}>
                            {!project.imageUrl && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-gray-400">image</span>
                                </div>
                            )}
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{project.name}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${project.status === 'DONE' ? 'bg-green-100 text-green-800' :
                                        project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {project.status || 'TO_DO'}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-gray-300 text-sm mb-4 line-clamp-2">{project.clientName || 'Sem cliente'}</p>

                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#1b3224] flex items-center justify-between text-xs text-slate-400">
                                <span>Atualizado há pouco</span>
                                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Ver detalhes <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
