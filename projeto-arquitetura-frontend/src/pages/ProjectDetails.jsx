import React from 'react';

const ProjectDetails = () => {
    return (
        <div className="flex flex-col items-center py-8 px-4 md:px-10 lg:px-40">
            <div className="flex flex-col max-w-[1200px] w-full flex-1 gap-6">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 px-4 text-sm">
                    <span className="text-gray-500 dark:text-text-secondary">Projetos</span>
                    <span className="text-gray-500 dark:text-text-secondary">/</span>
                    <span className="text-slate-900 dark:text-white font-medium">Residência Silva</span>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-6 px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Residência Silva - Alphaville</h1>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#254632] text-primary border border-primary/20">Em Andamento</span>
                            </div>
                            <p className="text-gray-500 dark:text-text-secondary text-sm md:text-base font-normal flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">qr_code</span> Código: #2023-042 •
                                <span className="material-symbols-outlined text-sm">location_on</span> Alphaville, SP
                            </p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-gray-200 dark:bg-surface-highlight hover:bg-gray-300 dark:hover:bg-[#366348] text-slate-900 dark:text-white text-sm font-bold transition-colors">
                                <span className="material-symbols-outlined text-lg">edit</span>
                                <span>Editar</span>
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary hover:bg-[#2dc86a] text-[#112117] text-sm font-bold transition-colors shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                                <span className="material-symbols-outlined text-lg">add</span>
                                <span>Nova Tarefa</span>
                            </button>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 dark:border-border-dark w-full overflow-x-auto">
                        {['Visão Geral', 'Cronograma', 'Arquivos', 'Equipe', 'Financeiro'].map((tab, i) => (
                            <button key={i} className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'text-primary border-b-2 border-primary font-bold' : 'text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
                    {/* Left Col */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Progresso Geral', val: '65%', tag: '+5% este mês', icon: 'trending_up', col: 'text-primary' },
                                { label: 'Orçamento Utilizado', val: 'R$ 45.000', tag: '75% do total', icon: 'attach_money', col: 'text-orange-400' },
                                { label: 'Prazo Restante', val: '12 Dias', tag: 'Atenção', icon: 'schedule', col: 'text-blue-400' },
                                { label: 'Documentos', val: '34 Arquivos', tag: '+2 novos', icon: 'folder', col: 'text-purple-400' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-2 rounded-lg bg-gray-100 dark:bg-surface-highlight ${stat.col} w-fit`}>
                                            <span className="material-symbols-outlined">{stat.icon}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${i === 2 ? 'text-orange-400 bg-orange-400/10' : 'text-primary bg-primary/10'}`}>{stat.tag}</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-text-secondary text-sm font-medium mt-2">{stat.label}</p>
                                        <p className="text-slate-900 dark:text-white text-2xl font-bold">{stat.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Phase Progress */}
                        <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Fase Atual: Documentação Executiva</h3>
                                <button className="text-gray-500 dark:text-text-secondary hover:text-primary text-sm font-medium transition-colors">Ver Detalhes</button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-900 dark:text-white font-medium">Progresso da Fase</span>
                                    <span className="text-primary font-bold">65%</span>
                                </div>
                                <div className="h-3 w-full bg-gray-200 dark:bg-surface-highlight rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '65%' }}></div>
                                </div>
                                <p className="text-gray-500 dark:text-text-secondary text-xs mt-1">Próxima entrega: Plantas Hidráulicas (Sexta-feira)</p>
                            </div>
                            <div className="mt-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#122118] border border-gray-200 dark:border-border-dark">
                                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#36e27b]"></div>
                                    <span className="text-slate-900 dark:text-white text-sm flex-1">Detalhamento de Marcenaria</span>
                                    <span className="text-gray-500 dark:text-text-secondary text-xs">02/10 - 08/10</span>
                                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Em Andamento</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Team */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Equipe do Projeto</h3>
                                <button className="text-primary text-sm font-bold hover:underline">Gerenciar</button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {['Ana Souza', 'Carlos Mendes', 'João Silva'].map((name, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-900 dark:text-white text-sm font-medium truncate">{name}</p>
                                            <p className="text-gray-500 dark:text-text-secondary text-xs truncate">Membro da Equipe</p>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-400 text-lg cursor-pointer hover:text-primary">chat</span>
                                    </div>
                                ))}
                                <button className="mt-2 w-full py-2 rounded-lg border border-dashed border-gray-300 dark:border-border-dark text-gray-500 dark:text-text-secondary text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Adicionar Membro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
