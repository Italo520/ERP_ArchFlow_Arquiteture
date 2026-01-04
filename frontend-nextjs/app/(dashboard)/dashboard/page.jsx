'use client';

import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'Mai', receita: 45, despesa: 30 },
    { name: 'Jun', receita: 50, despesa: 25 },
    { name: 'Jul', receita: 60, despesa: 40 },
    { name: 'Ago', receita: 55, despesa: 35 },
    { name: 'Set', receita: 70, despesa: 28 },
    { name: 'Out', receita: 85, despesa: 38 },
];

const FinancialDashboard = () => {
    return (
        <div className="p-6 lg:p-10 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Visão Geral Financeira</h1>
                    <p className="text-slate-500 dark:text-[#95c6a9] text-base font-normal leading-normal max-w-2xl">
                        Acompanhe o fluxo de caixa, despesas e lucratividade dos projetos em tempo real.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-gray-200 dark:bg-[#254632] text-slate-900 dark:text-white text-sm font-bold hover:bg-gray-300 dark:hover:bg-[#366348] transition-colors">
                        <span className="material-symbols-outlined mr-2 text-[18px]">download</span>
                        <span>Exportar</span>
                    </button>
                    <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-[#122118] text-sm font-bold hover:bg-[#1bc65f] transition-colors shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined mr-2 text-[18px]">add</span>
                        <span>Nova Despesa</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Faturamento Total', value: 'R$ 145.000,00', trend: '+12%', icon: 'attach_money', color: 'blue' },
                    { label: 'Despesas Totais', value: 'R$ 54.000,00', trend: '-3%', icon: 'credit_card', color: 'red' },
                    { label: 'Lucro Líquido', value: 'R$ 91.000,00', trend: '+18%', icon: 'account_balance_wallet', color: 'green' },
                    { label: 'Margem de Lucro', value: '63%', trend: '+2%', icon: 'pie_chart', color: 'purple' },
                ].map((stat, index) => (
                    <div key={index} className="flex flex-col justify-between rounded-xl p-5 bg-white dark:bg-[#254632] border border-gray-100 dark:border-none shadow-sm dark:shadow-none hover:translate-y-[-2px] transition-transform duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : stat.color === 'red' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : stat.color === 'green' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'}`}>
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </div>
                            <span className={`flex items-center text-sm font-bold px-2 py-1 rounded ${stat.trend.startsWith('+') ? 'text-primary bg-primary/10' : 'text-primary bg-primary/10'}`}>
                                <span className="material-symbols-outlined text-[16px] mr-1">{stat.trend.startsWith('+') ? 'trending_up' : 'trending_down'}</span>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-[#95c6a9] text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-[#254632] rounded-xl p-6 border border-gray-100 dark:border-none h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Fluxo de Caixa</h3>
                            <p className="text-slate-500 dark:text-[#95c6a9] text-sm">Receitas vs Despesas (Últimos 6 meses)</p>
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} barSize={12} barGap={4}>
                                <XAxis dataKey="name" tick={{ fill: '#95c6a9', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#1a2620', border: '1px solid #254632', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="despesa" radius={[4, 4, 0, 0]}>
                                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill="#4b5563" />)}
                                </Bar>
                                <Bar dataKey="receita" radius={[4, 4, 0, 0]}>
                                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill="#38e07b" />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="lg:col-span-1 bg-white dark:bg-[#254632] rounded-xl p-6 border border-gray-100 dark:border-none flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Despesas por Categoria</h3>
                        <p className="text-slate-500 dark:text-[#95c6a9] text-sm">Onde o dinheiro está sendo gasto</p>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        {[
                            { label: 'Empreiteiros', val: '45%', color: 'bg-blue-400' },
                            { label: 'Materiais', val: '30%', color: 'bg-primary' },
                            { label: 'Software & Licenças', val: '15%', color: 'bg-purple-400' },
                            { label: 'Marketing', val: '10%', color: 'bg-yellow-400' },
                        ].map((item, idx) => (
                            <div key={idx} className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`${item.color} w-2 h-2 rounded-full`}></span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.val}</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-black/20 rounded-full h-1.5">
                                    <div className={`${item.color} h-1.5 rounded-full`} style={{ width: item.val }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white dark:bg-[#254632] rounded-xl border border-gray-100 dark:border-none overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-[#1b3224] flex justify-between items-center">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Desempenho por Projeto</h3>
                    <a href="#" className="text-primary text-sm font-bold hover:underline">Ver todos</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-[#1b3224] text-slate-500 dark:text-[#95c6a9]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Projeto</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Orçamento</th>
                                <th className="px-6 py-4 font-semibold">Faturado</th>
                                <th className="px-6 py-4 font-semibold">Lucro</th>
                                <th className="px-6 py-4 font-semibold text-center">% Margem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#1b3224]">
                            {[
                                { name: 'Residência Silva', status: 'Em andamento', bud: 'R$ 120.000', inv: 'R$ 85.000', prof: 'R$ 45.000', pct: 52, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXFJlNI1Z7qqNjfj4nm2qHu8jjpgRxtnT1flHIpDzWZpawPRvnWBovCDyfMGEdcv5F3H8pvNQ49N6-ZbbSIQpV22qlLWX_q3xnwxRijNryhyNNMusZD_KbP3u61MHvfqbQ_tt2qePWJ0q5asoxaEsc6KmqoKp-ZhA4O43uAUoOpDQOu4-Juba5jAlbNh7bpDs-aoLufhjxKK1m38MUG8sPIYyKJL8r45eGB3230k0D2-aCKbOvIL2XZkkUWiFN0UH-8GKh-pbiXqM' },
                                { name: 'Edifício Horizon', status: 'Fase Final', bud: 'R$ 450.000', inv: 'R$ 410.000', prof: 'R$ 180.000', pct: 40, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtjNrJQun6G2tyG1YVM6WI4qiBiGdevhbhzIOdfl3nyPi76pjkgl3uhP857H_SJ_LS_z04Qgg4A0YBFTjoJPFHEcY22hPc4QNsekRWehDhj0BIYZKLUGyW86Kdsh-dqWxJR_TbMN1_nzsARdIzoCq9g3YiI3nAb2drr446zN-t7z3bm2SrSHlU7UsH_p66-SZFZwCeEigY99u69HraLsyaM48hyo3PMeJwDewabC0SfHqnePiTTsbrxPLo2eao03QUgR4dyp9oOio' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#2d523b] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: `url('${row.img}')` }}></div>
                                            <span className="font-bold text-slate-900 dark:text-white">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Fase Final' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-gray-300">{row.bud}</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-gray-300">{row.inv}</td>
                                    <td className="px-6 py-4 font-bold text-primary">{row.prof}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-16 bg-gray-200 dark:bg-black/30 rounded-full h-1.5">
                                                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${row.pct}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">{row.pct}%</span>
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

export default FinancialDashboard;
