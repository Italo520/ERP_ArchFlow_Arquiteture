"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, PieChart, TrendingUp } from "lucide-react";

export default function ProjectFinancialTab({ project, metrics }: { project: any, metrics: any }) {
    // Calculate simple financials
    const budget = Number(project.plannedCost) || 0;
    const spent = Number(project.actualCost) || 0; // or use metrics.budgetSpent if available
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;

    // In a real app, 'spent' would come from aggregated expenses/bills.
    // Here we use the field from Project model which might be manually updated or calculated.

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {budget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground">Planejado para o projeto</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Executado</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% do orçamento</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saldo Restante</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">R$ {(budget - spent).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground">Disponível</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Execução Orçamentária</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Consumo do Orçamento</span>
                            <span className="font-medium">{percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground text-center italic">
                            O detalhamento financeiro por categoria e histórico de transações será implementado na Fase 7 (Funcionalidades Avançadas).
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
