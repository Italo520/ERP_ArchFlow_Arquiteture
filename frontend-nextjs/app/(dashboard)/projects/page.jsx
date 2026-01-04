'use client';

import React from 'react';

const Kanban = () => {
    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Kanban Header */}
            <header className="h-16 flex-none bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-6 lg:px-10">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Kanban de Projetos</h1>
                    <p className="text-sm text-gray-500 dark:text-text-secondary mt-0.5">Visão geral do progresso dos projetos.</p>
                </div>
                <button className="px-5 py-2.5 bg-primary hover:bg-green-400 text-background-dark rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center gap-2 font-bold text-sm">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Novo Projeto
                </button>
            </header>

            {/* Kanban Board Container */}
            <div className="flex-1 flex overflow-x-auto p-6 gap-6 h-full items-start">
                {/* Column: To Do */}
                <div className="w-80 flex-shrink-0 flex flex-col bg-gray-50 dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-border-dark h-full max-h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border-dark sticky top-0 bg-gray-50 dark:bg-surface-dark z-10 rounded-t-xl">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">To Do</h3>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-400 dark:text-gray-900">1</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Card */}
                        <div className="group bg-white dark:bg-[#1a202c] rounded-xl border-t-2 border-yellow-400 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer">
                            <div className="relative h-40 overflow-hidden">
                                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwf-kBzxy1SQl73sLNqUbmHoFsocoONjJTcHPOmoSZNJS2Hi0vhYkAfjx-_lJ1KV_hL5wVOCrxI2lOsjWp08hD6yqRhmgUm0BzFDz-8akAGAITP4eNfQudiQBwvxcEBwwmKVUGwjb8qNwbXZXGcxVUPiyk0RtKLGREQU6nOArMwIpqM0JUuY7oHA-7XNqk28aN8A6Gtq4kbC_Rt6ZZv1jcwXyt8BlpNoBghP0Vyfz3MvRAlUES1qn0ovy9lXMbvuAlw8rD0Watu_c" alt="Project" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Residência Silva</h4>
                                <div className="flex items-center text-xs text-gray-500 dark:text-text-secondary mt-1 mb-3">
                                    <span className="material-symbols-outlined text-sm mr-1">person</span>
                                    Cliente: Ítalo Silva
                                </div>
                                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-border-dark flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white dark:border-surface-dark flex items-center justify-center text-xs font-bold text-gray-600">+2</div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Entrega</span>
                                        <span className="text-xs font-medium text-slate-700 dark:text-gray-300">14 Out 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add Button */}
                        <button className="w-full flex flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-border-dark hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <span className="material-symbols-outlined text-2xl text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">add</span>
                            </div>
                            <span className="font-medium text-base text-slate-700 dark:text-white mb-1">Criar Novo Projeto</span>
                        </button>
                    </div>
                </div>

                {/* Column: In Progress */}
                <div className="w-80 flex-shrink-0 flex flex-col bg-gray-50 dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-border-dark h-full max-h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border-dark sticky top-0 bg-gray-50 dark:bg-surface-dark z-10 rounded-t-xl">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Em Andamento</h3>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-400 dark:text-gray-900">2</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Card */}
                        <div className="group bg-white dark:bg-[#1a202c] rounded-xl border-t-2 border-blue-400 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer">
                            <div className="relative h-40 overflow-hidden">
                                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7An5NaCXS1XMsTGVgn76NoLTlfEwfLttBm3L4CoA1X3nOCZDdHNU_C2oj9v64q0BufdLzyGz5_-OsHjunhI-xbpfIveA1Gn5oJEAjycBIvEyuPg4ctT_e66qOOsj3diiD8YqDbLdBhQboZ0I29vhTTEFnEmqWmQFysk-xrnStOcnQ0tphw6HJs9UOtQJcIsS2P1Q0lXWDXSnsXK0uYzQqn4iDOheTG_usGmedpXpNfnQTwu8YNk5fwTVrst5QzqQxT5xsbM12Zgg" alt="Project" />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Loft Centro</h4>
                                <div className="flex items-center text-xs text-gray-500 dark:text-text-secondary mt-1 mb-3">
                                    <span className="material-symbols-outlined text-sm mr-1">business</span>
                                    Cliente: Construtora Vertical
                                </div>
                                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-border-dark flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <img className="w-7 h-7 rounded-full border-2 border-white dark:border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhYQ9vrZrh4x3tljY5lR9ASORLatWHsTS_RLi2mSmGKMLxTY4a-kmlgMfNTId-tMCLFXFmdt70hzLiOw2NTGVxCW7v7jDXGtM6L3giUxCEBaykq8JRIhUt1Kz03kX9MhT9JOtT6GBrz5HxUbzqrJHyLHYaxqWxQVaY56ira4cXb3QUCU3_8DOkvqyWBZ3jl5FGgUzbl0yqnqNv8b9ocuTG-fqTlDwPBjKLP1VULwzbdzsOgMugnLX2oJWuHvdYvEyFZHjL75JUuuc" />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Entrega</span>
                                        <span className="text-xs font-medium text-slate-700 dark:text-gray-300">15 Nov 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="group bg-white dark:bg-[#1a202c] rounded-xl border-t-2 border-blue-400 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer">
                            <div className="relative h-40 overflow-hidden">
                                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCELcE35kc_X3_ks8GMa8xeKO0ZX4fC0kyGIKlp5pxyJ2BP1ERAR1sBhmVQjq-d88vxDyOIVXuwbxZP8uaBUD1omFi4p2Dvnx6_tIrd8W8-HyqMDrnZG-njlw17_gde08KQNOiwlOxg_P4AvH282jvSMMSNONL43ef5W1a_b9cx23YvFvI14mPrEifc3p9BgycES8ohVsJQ8qsGJQ9IbOaj2BJbTc8InubrPohIpn0GRV52b5L9O9dYVh0XeMOLyhxtl_YWTJX-drw" alt="Project" />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Casa de Praia</h4>
                                <div className="flex items-center text-xs text-gray-500 dark:text-text-secondary mt-1 mb-3">
                                    <span className="material-symbols-outlined text-sm mr-1">person</span>
                                    Cliente: Família Oliveira
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column: Due Soon */}
                <div className="w-80 flex-shrink-0 flex flex-col bg-gray-50 dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-border-dark h-full max-h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border-dark sticky top-0 bg-gray-50 dark:bg-surface-dark z-10 rounded-t-xl">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Atenção</h3>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 dark:bg-red-400 dark:text-gray-900">1</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="group bg-white dark:bg-[#1a202c] rounded-xl border-t-2 border-red-400 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer">
                            <div className="relative h-40 overflow-hidden">
                                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCU8-3DdMA93Cx7PEzo4wRt4VFzvkB-Bm8ojnWGxXz1pOJMVI1W4JBVPEbGTWHS0emm2Jk3jglcv_wl6BF7WD0xfZMo8P0Q8yesWNnAt4m_bBT2QSUzGGaHdjha8Lld2NIEme8w_CajbqjNJf4hvLp3R4xh6aWFj5XMkYtLnSskO5TLqfjn7CxEy6hIJRF8b9_YmE6jgm3FMjG58KhX1I9sZ8anlg-dfskMODiT0yeZO-ufyUl4hWf4XYOUItuFwbAR2sIfiiUtYk" alt="Project" />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Renovação Apartamento</h4>
                                <div className="flex items-center text-xs text-gray-500 dark:text-text-secondary mt-1 mb-3">
                                    <span className="material-symbols-outlined text-sm mr-1">person</span>
                                    Cliente: Marcelo Costa
                                </div>
                                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-border-dark flex items-center justify-between">
                                    <div className="flex flex-col items-end w-full">
                                        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Entrega</span>
                                        <span className="text-xs font-medium text-red-500">05 Nov 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kanban;
