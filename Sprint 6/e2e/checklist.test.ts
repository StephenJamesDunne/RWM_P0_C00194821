import {test, expect} from '@playwright/test';

test('should render one item, click it, assert the checkbox is checked and that a parent counter increments', async ({page}) => {
    await page.goto('/test-checklist');

    const checkbox = page.locator('input[type="checkbox"]').first();
    const counter = page.getByTestId('counter');

    // Check initial state
    await expect(checkbox).not.toBeChecked();
    await expect(counter).toHaveText('Completed: 0/3');

    // Click checkbox
    await checkbox.click();
    
    // Assert checkbox is checked
    await expect(checkbox).toBeChecked();
    
    // Assert counter updated
    await expect(counter).toHaveText('Completed: 1/3');

    // Optional: Test unchecking
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
    await expect(counter).toHaveText('Completed: 0/3');
});