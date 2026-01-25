"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    DollarSign,
    PieChart,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    CreditCard
} from "lucide-react";

export default function ProjectFinancialTab({ project, metrics }: { project: any, metrics: any }) {
    // Calculate simple financials
    const budget = Number(project.plannedCost) || 0;
    const spent = Number(project.actualCost) || 0;
    const revenue = Number(project.totalValue) || 0; // Total contract value
    const received = project.financials?.totalReceived || 0; // Assuming structured field

    const budgetPercentage = budget > 0 ? (spent / budget) * 100 : 0;
    const collectionPercentage = revenue > 0 ? (received / revenue) * 100 : 0;
    const profit = revenue - spent;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contrato Total</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <span className="flex items-center text-green-600 mr-1">
                                <TrendingUp className="h-3 w-3 mr-0.5" />
                                +12%
                            </span>
                            vs. orçado original
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Recebido</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {received.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground mt-1">{collectionPercentage.toFixed(1)}% do total</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Custos Totais</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground mt-1">{budgetPercentage.toFixed(1)}% do orçamento</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Margem Prevista</CardTitle>
                        <CreditCard className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground mt-1">{((profit / revenue) * 100 || 0).toFixed(1)}% de margem</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Execução Orçamentária</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Budget gasto</span>
                                <span className="font-medium">{budgetPercentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={budgetPercentage} className="h-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Faturamento realizado</span>
                                <span className="font-medium">{collectionPercentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={collectionPercentage} className="h-2 bg-muted transition-all" />
                        </div>

                        <div className="pt-4 border-t grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-semibold">Custo Restante</p>
                                <p className="text-sm font-bold">R$ {(budget - spent).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-semibold">A Receber</p>
                                <p className="text-sm font-bold">R$ {(revenue - received).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Distribuição de Custos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-[180px]">
                            <PieChart className="h-20 w-20 text-muted-foreground opacity-20" />
                            <p className="absolute text-xs text-muted-foreground text-center max-w-[150px]">
                                Histórico de transações e fluxo de caixa detalhado em breve.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-xs">Mão de obra</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-400" />
                                <span className="text-xs">Materiais</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-orange-400" />
                                <span className="text-xs">Taxas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-purple-400" />
                                <span className="text-xs">Outros</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
