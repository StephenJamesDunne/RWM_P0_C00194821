import { test, expect } from '@playwright/test';

test('should display Progress Checklist title on checklist page', async ({ page }) => {
    await page.goto('/lab/checklist');
    await expect(page.getByTestId('title')).toContainText('Progress Checklist');
});

// This test is expected to fail