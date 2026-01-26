import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface ExcelSheetData {
    name: string;
    headers: string[];
    rows: (string | number | Date | null)[][];
}

export interface ExcelReportData {
    filename: string;
    sheets: ExcelSheetData[];
    metadata?: {
        title?: string;
        author?: string;
        createdAt?: Date;
    };
}

/**
 * Generate an Excel workbook with multiple sheets
 */
export function generateReportExcel(data: ExcelReportData): Blob {
    const workbook = XLSX.utils.book_new();

    // Set workbook properties
    workbook.Props = {
        Title: data.metadata?.title || 'Relatório ArchFlow',
        Author: data.metadata?.author || 'ArchFlow ERP',
        CreatedDate: data.metadata?.createdAt || new Date(),
    };

    // Create sheets
    for (const sheet of data.sheets) {
        // Combine headers and rows
        const sheetData = [sheet.headers, ...sheet.rows];

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

        // Style header row (column widths)
        const colWidths = sheet.headers.map((header, index) => {
            const maxContentLength = Math.max(
                header.length,
                ...sheet.rows.map(row => String(row[index] || '').length)
            );
            return { wch: Math.min(Math.max(maxContentLength + 2, 10), 50) };
        });
        worksheet['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name.substring(0, 31)); // Excel sheet name limit
    }

    // Generate binary
    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
        compression: true,
    });

    return new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
}

/**
 * Generate Business Report Excel
 */
export function generateBusinessReportExcel(data: {
    totalRevenue: number;
    profitMargin: number;
    newClients: number;
    monthlyPerformance: { month: string; revenue: number; expenses: number; profit: number }[];
    period: string;
}): Blob {
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return generateReportExcel({
        filename: `relatorio-negocio-${format(new Date(), 'yyyy-MM-dd')}.xlsx`,
        metadata: {
            title: 'Relatório de Negócio',
            author: 'ArchFlow ERP',
            createdAt: new Date(),
        },
        sheets: [
            {
                name: 'Resumo',
                headers: ['Métrica', 'Valor'],
                rows: [
                    ['Período', data.period],
                    ['Receita Total', formatCurrency(data.totalRevenue)],
                    ['Margem de Lucro', `${data.profitMargin.toFixed(1)}%`],
                    ['Novos Clientes', data.newClients],
                    ['Data de Geração', format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR })],
                ],
            },
            {
                name: 'Desempenho Mensal',
                headers: ['Mês', 'Receita', 'Despesas', 'Lucro', 'Margem (%)'],
                rows: data.monthlyPerformance.map((row) => [
                    row.month,
                    row.revenue,
                    row.expenses,
                    row.profit,
                    row.revenue > 0 ? Number(((row.profit / row.revenue) * 100).toFixed(1)) : 0,
                ]),
            },
        ],
    });
}

/**
 * Generate Productivity Report Excel
 */
export function generateProductivityReportExcel(data: {
    totalHours: number;
    billableHours: number;
    nonBillableHours: number;
    averageUtilization: number;
    userRanking: { name: string; totalHours: number; billableHours: number; utilization: number }[];
    period: string;
}): Blob {
    return generateReportExcel({
        filename: `relatorio-produtividade-${format(new Date(), 'yyyy-MM-dd')}.xlsx`,
        metadata: {
            title: 'Relatório de Produtividade',
            author: 'ArchFlow ERP',
            createdAt: new Date(),
        },
        sheets: [
            {
                name: 'Resumo',
                headers: ['Métrica', 'Valor'],
                rows: [
                    ['Período', data.period],
                    ['Total de Horas', `${data.totalHours.toFixed(1)}h`],
                    ['Horas Faturáveis', `${data.billableHours.toFixed(1)}h`],
                    ['Horas Não Faturáveis', `${data.nonBillableHours.toFixed(1)}h`],
                    ['Taxa de Utilização Média', `${data.averageUtilization.toFixed(1)}%`],
                    ['Data de Geração', format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR })],
                ],
            },
            {
                name: 'Ranking Produtividade',
                headers: ['Posição', 'Usuário', 'Horas Totais', 'Horas Faturáveis', 'Utilização (%)'],
                rows: data.userRanking.map((user, index) => [
                    index + 1,
                    user.name,
                    Number(user.totalHours.toFixed(1)),
                    Number(user.billableHours.toFixed(1)),
                    Number(user.utilization.toFixed(1)),
                ]),
            },
        ],
    });
}

/**
 * Generate Financial Report Excel (placeholder for future implementation)
 */
export function generateFinancialReportExcel(data: {
    period: string;
    revenue: number;
    expenses: number;
    profit: number;
}): Blob {
    return generateReportExcel({
        filename: `relatorio-financeiro-${format(new Date(), 'yyyy-MM-dd')}.xlsx`,
        metadata: {
            title: 'Relatório Financeiro',
            author: 'ArchFlow ERP',
            createdAt: new Date(),
        },
        sheets: [
            {
                name: 'Resumo Financeiro',
                headers: ['Métrica', 'Valor'],
                rows: [
                    ['Período', data.period],
                    ['Receita', data.revenue],
                    ['Despesas', data.expenses],
                    ['Lucro Líquido', data.profit],
                ],
            },
        ],
    });
}
