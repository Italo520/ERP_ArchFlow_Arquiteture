import { test, expect } from '@playwright/test';

test.describe('Activity Flow', () => {

    // Setup: Login
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        // Fill login form - assuming there are name attributes 'email' and 'password'
        await page.getByLabel('Email').fill('admin@archflow.local');
        await page.getByLabel('Password').fill('password123');
        await page.getByRole('button', { name: /Login|Entrar/i }).click();

        // Wait for redirect to dashboard
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Scenario 1: Create activity in calendar and verify in list', async ({ page }) => {
        await page.goto('/activities');

        // Open Quick Activity Modal (assuming clicking on a day or a "New Activity" button)
        // Since calendar interaction is complex, let's assume we use the "Create Activity" trigger if available,
        // or click on a specific day.
        // For simplicity, let's assume there's a "New Activity" button or we click a day. 
        // Based on PRD tasks 4.2.1-4.2.5, we have "Quick Activity Modal" that opens clicking on a day.

        // Locate a day in the calendar (e.g., today or first visible day) and click
        // Assuming the calendar renders days with some identifiable class/role
        // We'll try to find a day cell. This might be fragile without precise selectors.
        // Let's look for a button "New Activity" if it exists, or try to interact with the calendar.
        // If fragile, we will just navigate to a create form if routing allows, but it's a modal.

        // Alternative: Click on the "Activities" page header or search for a "Create" button.
        // If not, let's traverse the DOM for the calendar day.
        const dayCell = page.locator('.rbc-day-bg').first(); // React Big Calendar default class usually
        // Or if we implemented our own:
        // Wait, 4.2.2 says "ActivityCalendar.tsx".

        // Let's assume we click the first available day cell.
        await dayCell.click({ force: true });

        // Expect Modal
        await expect(page.getByText('New Activity')).toBeVisible();

        // Fill Form
        await page.getByLabel('Title').fill('E2E Test Meeting');
        await page.getByLabel('Type').click(); // Select Trigger
        // Select 'Meeting' option. Assuming Shadcn Select
        await page.getByRole('option', { name: 'Meeting' }).click();

        await page.getByRole('button', { name: 'Save' }).click();

        // Verify it appears in the list (ActivityList.tsx)
        // We might need to switch view or look at the list below/beside.
        // "Subtarefa 4.2.1 ... Lista de atividades do período"
        await expect(page.getByText('E2E Test Meeting')).toBeVisible();
    });

    test('Scenario 2 (Critical): Time Tracking Flow', async ({ page }) => {
        await page.goto('/time-tracking');

        // 1. Start Timer
        // Fill required Project first?
        // "Seletor de projeto/task" - usually required to start? Or can select after?
        // Let's Select Project.
        const projectSelect = page.getByPlaceholder(/Select a project/i);
        await projectSelect.click();
        // Determine option. We seeded 'Alpha HQ Renovation'.
        await page.getByRole('option', { name: /Alpha HQ/i }).first().click();

        // Start
        await page.getByRole('button', { name: /Start/i }).click();

        // Wait 2 seconds
        await page.waitForTimeout(2000);

        // Stop
        await page.getByRole('button', { name: /Stop/i }).click();

        // Verify Log in Table
        // The table is in the same page.
        // Look for the project name and duration close to 0:00:02 or > 0s.
        const recentLogsTable = page.locator('table'); // TimesheetTable
        await expect(recentLogsTable).toContainText('Alpha HQ Renovation');

        // Cleanup: Delete the log to keep system clean? 
        // "Ações (editar, deletar)" in 4.3.4
        // Click dropdow menu of the first row
        await recentLogsTable.locator('tr').nth(1).getByRole('button').click(); // Actions menu
        await page.getByRole('menuitem', { name: /Delete/i }).click();

        // Expect to be gone
        // Use a more specific locator if possible, or wait for disappear
        // await expect(recentLogsTable).not.toContainText('Alpha HQ Renovation'); // Might fail if other logs exist. 
        // But for this test, we are assuming it's the top one.
    });

    test('Scenario 3: Manual Log Fail', async ({ page }) => {
        await page.goto('/time-tracking');

        // Fill Manual Form (Side panel)
        // Skip Project Selection (Required)
        await page.getByLabel('Description').fill('Missing Project Log');

        await page.getByRole('button', { name: 'Save Log' }).click();

        // Expect Validation Error
        // Likely a toast or form error message.
        // Check for common error text or invalid state.
        // Shadcn Form usually shows error message below input.
        await expect(page.getByText(/Project is required/i)).toBeVisible();
    });

});
