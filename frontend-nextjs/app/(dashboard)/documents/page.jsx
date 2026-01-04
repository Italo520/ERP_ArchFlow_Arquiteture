'use client';

import React from 'react';

const Documents = () => {
    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden relative p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Documentos</h1>
                    <p className="text-gray-500 dark:text-[#96c5a9] text-sm max-w-xl">Gerencie plantas, renderizações e contratos do projeto Villa Residencial.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-[#122017] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm font-bold">
                        <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                        <span>Upload Novo</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-gray-200 dark:border-[#264532] mb-6">
                <div className="flex items-center gap-2">
                    {['Todos', 'Plantas (DWG)', 'Imagens', 'Contratos'].map((filter, i) => (
                        <button key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-transparent border border-gray-200 dark:border-[#264532] text-gray-600 dark:text-[#96c5a9] hover:border-primary hover:text-primary'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#1A2E22] p-1 rounded-full">
                    <button className="p-1.5 rounded-full bg-white dark:bg-[#264532] text-slate-900 dark:text-white shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    </button>
                    <button className="p-1.5 rounded-full text-gray-500 dark:text-[#96c5a9] hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">view_list</span>
                    </button>
                </div>
            </div>

            {/* Folders */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-500 dark:text-[#96c5a9] uppercase tracking-wider mb-4">Pastas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { name: 'Arquitetônico', count: '12 arquivos', color: 'text-yellow-400' },
                        { name: 'Estrutural', count: '8 arquivos', color: 'text-blue-400' },
                        { name: 'Hidráulico', count: '5 arquivos', color: 'text-purple-400' },
                    ].map((folder, i) => (
                        <div key={i} className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-[#1A2E22] border border-transparent hover:border-primary/50 cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/5">
                            <span className={`material-symbols-outlined ${folder.color} text-5xl mb-2 filled`}>folder</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white text-center truncate w-full">{folder.name}</span>
                            <span className="text-xs text-gray-500 dark:text-[#96c5a9]">{folder.count}</span>
                        </div>
                    ))}
                    <div className="group flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-[#264532] hover:border-primary cursor-pointer transition-all min-h-[130px]">
                        <div className="size-10 rounded-full bg-gray-100 dark:bg-[#264532] group-hover:bg-primary flex items-center justify-center transition-colors mb-2">
                            <span className="material-symbols-outlined text-gray-500 dark:text-[#96c5a9] group-hover:text-[#122017]">add</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500 dark:text-[#96c5a9] group-hover:text-primary">Nova Pasta</span>
                    </div>
                </div>
            </div>

            {/* Recent Files */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 dark:text-[#96c5a9] uppercase tracking-wider mb-4">Arquivos Recentes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'Planta_Baixa_Rev03.dwg', size: '2.4 MB • Hoje', icon: 'article', color: 'text-blue-500', bg: 'bg-blue-500/20' },
                        { name: 'Render_Fachada.jpg', size: '8.1 MB • Ontem', icon: 'image', color: 'text-green-500', bg: 'bg-green-500/20' },
                        { name: 'Contrato_Servicos.pdf', size: '540 KB • 12 Out', icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-500/20' },
                        { name: 'Memorial_Desc.docx', size: '1.2 MB • 10 Out', icon: 'text_snippet', color: 'text-gray-500', bg: 'bg-gray-500/20' },
                    ].map((file, i) => (
                        <div key={i} className="bg-white dark:bg-[#1A2E22] rounded-2xl p-4 relative group hover:ring-1 hover:ring-primary transition-all shadow-sm cursor-pointer">
                            <div className="h-32 rounded-xl bg-gray-100 dark:bg-[#122017] mb-4 flex items-center justify-center overflow-hidden relative group/preview">
                                <span className={`material-symbols-outlined text-6xl text-gray-300 dark:text-[#264532] group-hover/preview:text-primary transition-colors`}>description</span>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <div className={`size-10 rounded-lg ${file.bg} flex items-center justify-center shrink-0`}>
                                    <span className={`material-symbols-outlined ${file.color}`}>{file.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-[#96c5a9] mt-0.5">{file.size}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Documents;
