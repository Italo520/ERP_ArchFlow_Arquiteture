import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface ReportData {
    title: string;
    period: string;
    generatedAt: Date;
    summary?: {
        label: string;
        value: string | number;
    }[];
    tables?: {
        title: string;
        headers: string[];
        rows: (string | number)[][];
    }[];
}

/**
 * Generate a professional PDF report
 * Supports streaming for large reports
 */
export async function generateReportPDF(
    data: ReportData,
    type: 'business' | 'productivity' | 'financial' = 'business'
): Promise<Blob> {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Colors based on report type
    const colors = {
        business: { primary: [41, 98, 255] as [number, number, number], secondary: [100, 100, 100] as [number, number, number] },
        productivity: { primary: [34, 197, 94] as [number, number, number], secondary: [100, 100, 100] as [number, number, number] },
        financial: { primary: [245, 158, 11] as [number, number, number], secondary: [100, 100, 100] as [number, number, number] },
    };
    const theme = colors[type];

    // Header
    doc.setFillColor(...theme.primary);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Logo placeholder (would be actual logo in production)
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('ArchFlow', margin, 18);

    // Report Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(data.title, margin, 30);

    // Report metadata
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text(`Período: ${data.period}`, pageWidth - margin, 18, { align: 'right' });
    doc.text(
        `Gerado em: ${format(data.generatedAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
        pageWidth - margin,
        26,
        { align: 'right' }
    );

    yPosition = 55;

    // Summary Section
    if (data.summary && data.summary.length > 0) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Resumo Executivo', margin, yPosition);
        yPosition += 10;

        const summaryBoxWidth = (pageWidth - margin * 2 - 10 * (data.summary.length - 1)) / data.summary.length;

        data.summary.forEach((item, index) => {
            const xPos = margin + index * (summaryBoxWidth + 10);

            // Box background
            doc.setFillColor(245, 245, 245);
            doc.roundedRect(xPos, yPosition, summaryBoxWidth, 25, 2, 2, 'F');

            // Label
            doc.setFontSize(8);
            doc.setTextColor(...theme.secondary);
            doc.setFont('helvetica', 'normal');
            doc.text(item.label, xPos + 5, yPosition + 8);

            // Value
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.text(String(item.value), xPos + 5, yPosition + 20);
        });

        yPosition += 40;
    }

    // Tables
    if (data.tables && data.tables.length > 0) {
        for (const table of data.tables) {
            // Check if we need a new page
            if (yPosition > pageHeight - 60) {
                doc.addPage();
                yPosition = margin;
            }

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(table.title, margin, yPosition);
            yPosition += 5;

            autoTable(doc, {
                startY: yPosition,
                head: [table.headers],
                body: table.rows.map(row => row.map(cell => String(cell))),
                margin: { left: margin, right: margin },
                styles: {
                    fontSize: 9,
                    cellPadding: 4,
                },
                headStyles: {
                    fillColor: theme.primary,
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                },
                alternateRowStyles: {
                    fillColor: [250, 250, 250],
                },
                didDrawPage: (hookData) => {
                    // Footer on each page
                    doc.setFontSize(8);
                    doc.setTextColor(150, 150, 150);
                    doc.text(
                        `Página ${hookData.pageNumber}`,
                        pageWidth / 2,
                        pageHeight - 10,
                        { align: 'center' }
                    );
                },
            });

            yPosition = (doc as any).lastAutoTable.finalY + 15;
        }
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
        'ArchFlow ERP - Relatório Confidencial',
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
    );

    // Return as Blob
    return doc.output('blob');
}

/**
 * Generate PDF for specific report types with typed data
 */
export async function generateBusinessReportPDF(data: {
    totalRevenue: number;
    profitMargin: number;
    newClients: number;
    monthlyPerformance: { month: string; revenue: number; expenses: number; profit: number }[];
    period: string;
}): Promise<Blob> {
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return generateReportPDF({
        title: 'Relatório de Negócio',
        period: data.period,
        generatedAt: new Date(),
        summary: [
            { label: 'Receita Total', value: formatCurrency(data.totalRevenue) },
            { label: 'Margem de Lucro', value: `${data.profitMargin.toFixed(1)}%` },
            { label: 'Novos Clientes', value: data.newClients },
        ],
        tables: [
            {
                title: 'Desempenho Mensal',
                headers: ['Mês', 'Receita', 'Despesas', 'Lucro', 'Margem'],
                rows: data.monthlyPerformance.map((row) => [
                    row.month,
                    formatCurrency(row.revenue),
                    formatCurrency(row.expenses),
                    formatCurrency(row.profit),
                    row.revenue > 0 ? `${((row.profit / row.revenue) * 100).toFixed(1)}%` : '0%',
                ]),
            },
        ],
    }, 'business');
}

export async function generateProductivityReportPDF(data: {
    totalHours: number;
    billableHours: number;
    averageUtilization: number;
    userRanking: { name: string; totalHours: number; utilization: number }[];
    period: string;
}): Promise<Blob> {
    return generateReportPDF({
        title: 'Relatório de Produtividade',
        period: data.period,
        generatedAt: new Date(),
        summary: [
            { label: 'Total de Horas', value: `${data.totalHours.toFixed(1)}h` },
            { label: 'Horas Faturáveis', value: `${data.billableHours.toFixed(1)}h` },
            { label: 'Utilização Média', value: `${data.averageUtilization.toFixed(1)}%` },
        ],
        tables: [
            {
                title: 'Ranking de Produtividade',
                headers: ['#', 'Usuário', 'Horas', 'Utilização'],
                rows: data.userRanking.map((user, index) => [
                    index + 1,
                    user.name,
                    `${user.totalHours.toFixed(1)}h`,
                    `${user.utilization.toFixed(0)}%`,
                ]),
            },
        ],
    }, 'productivity');
}
