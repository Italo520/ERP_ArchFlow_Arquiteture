import React from 'react';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 lg:p-10 max-w-[1200px] mx-auto flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold tracking-tight">Gerenciamento de Clientes</h1>
                    <p className="text-slate-500 dark:text-text-secondary text-base font-normal max-w-2xl">
                        Visualize e gerencie seus clientes, contatos e o progresso dos projetos arquitetônicos associados.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-green-400 text-background-dark px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-primary/20 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Novo Cliente</span>
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <label className="flex w-full items-center gap-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-transparent focus-within:border-primary/50 rounded-xl px-4 h-12 transition-all">
                        <span className="material-symbols-outlined text-gray-400 dark:text-text-secondary">search</span>
                        <input className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-text-secondary focus:ring-0 text-base" placeholder="Pesquisar por nome, email ou empresa..." />
                    </label>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0">
                    <button className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark hover:border-primary dark:hover:border-text-secondary text-slate-700 dark:text-white px-4 h-12 rounded-xl whitespace-nowrap transition-colors">
                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                        <span className="text-sm font-medium">Filtros</span>
                    </button>
                    <button className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark hover:border-primary dark:hover:border-text-secondary text-slate-700 dark:text-white px-4 h-12 rounded-xl whitespace-nowrap transition-colors">
                        <span className="text-sm font-medium">Status: Todos</span>
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#1e2b24]">
                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary w-[20px]">
                                    <input type="checkbox" className="rounded border-gray-300 dark:border-border-dark bg-white dark:bg-background-dark text-primary focus:ring-primary h-4 w-4" />
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">Cliente / Empresa</th>
                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">Contato</th>
                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">Projetos Ativos</th>
                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">Status</th>
                                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-border-dark text-slate-900 dark:text-white text-sm">
                            {[
                                { name: 'Roberto Almeida', company: 'Almeida & Sons Ltda', email: 'roberto@almeida.com', phone: '(11) 98765-4321', projects: [{ n: 'Residencial Vila Nova', c: 'blue' }, { n: 'Interiores Loft', c: 'purple' }], img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwtSlShR_-aRYm0KoRcea6JK5xn-e6rtNUM7EX6FOfrYeWny-x801sUxm-b7rkJhiwQbo_kKqnh-2642--OGQg9GyUdaRfLCNKm1ymgNYKfhUrFTl_euFUyBwZhAcL4jSBDnmIrYzP8iRqi1UMSDZT5-OHeaAYnZI70Al3coM_GM5kFysga4Lei655pYjDsZybSX7SKEnDyXyESgcCzmuYzPFqK5uL7_yESLVjDq19AJor6ux0Gd8J2sv2cLS_k3kY1aH9aC1vGC0' },
                                { name: 'Mariana Costa', company: 'Cliente Particular', email: 'mari.costa@email.com', phone: '(21) 99999-8888', projects: [{ n: 'Reforma Cozinha', c: 'orange' }], img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6L3UrYjJQU4mnPU5In61FxmLD6aGxIGjk7OrANfE8gl2QOmjQo6ytWdI3ia-ZOqq2WhTtNEjuxIwkV83YtA6_Vft320SnXByX-OCtEHTRRWmyzzhzYozjp7FX-xB_k_ieroT1DjgNKFkM20wUVd0rePlWNl6Gro_j9DW8L1V-CYGAq3xHHsthdGW0d_oZsVIYg_XbOouCeaS8e8koGGXHQdlupUS330t10wB0owXHwfNvR4GhjHJhxa8bLgfwohdKYOdr8wqE0U' },
                            ].map((client, i) => (
                                <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-background-dark/50 transition-colors cursor-pointer" onClick={() => navigate('/projects/details')}>
                                    <td className="py-4 px-6 align-middle">
                                        <input type="checkbox" className="rounded border-gray-300 dark:border-border-dark bg-white dark:bg-background-dark text-primary focus:ring-primary h-4 w-4" onClick={(e) => e.stopPropagation()} />
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${client.img}')` }}></div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-base text-slate-900 dark:text-white">{client.name}</span>
                                                <span className="text-gray-500 dark:text-text-secondary text-xs">{client.company}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-gray-500 dark:text-text-secondary">
                                                <span className="material-symbols-outlined text-[14px]">mail</span>
                                                <span>{client.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 dark:text-text-secondary">
                                                <span className="material-symbols-outlined text-[14px]">call</span>
                                                <span>{client.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        <div className="flex flex-wrap gap-2">
                                            {client.projects.map((p, idx) => (
                                                <span key={idx} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border ${p.c === 'blue' ? 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' : p.c === 'purple' ? 'bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' : 'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20'}`}>
                                                    <span className={`size-1.5 rounded-full ${p.c === 'blue' ? 'bg-blue-500' : p.c === 'purple' ? 'bg-purple-500' : 'bg-orange-500'}`}></span>
                                                    {p.n}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary border border-primary/20">
                                            Ativo
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-border-dark rounded-full transition-colors" title="Editar">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="p-2 text-gray-500 dark:text-text-secondary hover:text-primary hover:bg-gray-200 dark:hover:bg-border-dark rounded-full transition-colors" title="Ver Projetos">
                                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Clients;
