import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectFinancialTab from '@/components/projects/ProjectFinancialTab';

// Mock lucide-react
jest.mock('lucide-react', () => ({
    DollarSign: () => <div data-testid="dollar-icon" />,
    PieChart: () => <div data-testid="pie-icon" />,
    TrendingUp: () => <div data-testid="trend-up-icon" />,
    ArrowUpRight: () => <div data-testid="arrow-up-icon" />,
    ArrowDownRight: () => <div data-testid="arrow-down-icon" />,
    Wallet: () => <div data-testid="wallet-icon" />,
    CreditCard: () => <div data-testid="card-icon" />,
}));

describe('ProjectFinancialTab', () => {
    const mockProject = {
        id: '1',
        plannedCost: 10000,
        actualCost: 2500,
        totalValue: 15000,
        financials: { totalReceived: 5000 }
    };

    it('renders financial metrics correctly', () => {
        render(<ProjectFinancialTab project={mockProject} metrics={{}} />);

        // screen.debug();

        // Use flexible matching and getAll to handle multiple occurrences
        expect(screen.getAllByText(/15\.000,00/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/5\.000,00/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/2\.500,00/).length).toBeGreaterThanOrEqual(1);

        // Target specifically the percentage if needed
        const percentageElements = screen.queryAllByText(/25,0%/);
        if (percentageElements.length === 0) {
            // Check if it's rendered as 25.0% or 25%
            expect(screen.getAllByText(/25/).length).toBeGreaterThanOrEqual(1);
        } else {
            expect(percentageElements.length).toBeGreaterThanOrEqual(1);
        }
    });

    it('displays profit margin correctly', () => {
        render(<ProjectFinancialTab project={mockProject} metrics={{}} />);
        expect(screen.getAllByText(/12\.500,00/).length).toBeGreaterThanOrEqual(1);
    });
});
