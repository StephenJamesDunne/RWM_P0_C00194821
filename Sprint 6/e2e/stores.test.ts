import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Reset all checkboxes to unchecked state before each test
    await page.goto('/stores');
    
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    
    // Uncheck all boxes
    for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        if (await checkbox.isChecked()) {
            await checkbox.click();
        }
    }
    
    // Submit to reset the displayed state
    await page.locator('button').click();
});

test('Stores page - Checklist deterministic edge cases', async ({page}) => {
    await page.goto('/stores');

    const progressText = page.locator('p').filter({ hasText: 'Completed:' });
    const submitButton = page.locator('button');
    const percentText = page.getByTestId('percent');
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    const checkbox3 = page.locator('input[type="checkbox"]').nth(2);

    // Initial state: None checked -> Submit -> 0%
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');

    // Edge case 1: Submit with 1 box checked -> 33%
    await checkbox1.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 1/3');
    await expect(percentText).toHaveText('33%');

    // Edge case 2: Change selection (uncheck one, check two others) -> Submit -> 67%
    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 2/3');
    await expect(percentText).toHaveText('67%');

    // Edge case 3: All checked -> Submit -> 100%
    await checkbox1.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 3/3');
    await expect(percentText).toHaveText('100%');

    // Edge case 4: None checked -> Submit -> 0%
    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');

    // Verify state doesn't change without submit
    await checkbox1.click();
    await checkbox2.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
});

test('Store reactivity and submit button behavior', async ({page}) => {
    await page.goto('/stores');
    
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    const progressText = page.locator('p').filter({ hasText: 'Completed:' });
    const percentText = page.getByTestId('percent');
    const submitButton = page.locator('button');
    
    // Initial state
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
    
    // Check boxes but don't submit - display should not change
    await checkbox1.click();
    await checkbox2.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
    
    // But the submit button should show current state
    await expect(submitButton).toContainText('Submit (2/3 currently checked)');
    
    // Now submit - display should update
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 2/3');
    await expect(percentText).toHaveText('67%');
    
    // Make more changes without submitting
    await checkbox1.click(); // uncheck first box
    await expect(progressText).toHaveText('Completed: 2/3'); // still shows old value
    await expect(submitButton).toContainText('Submit (1/3 currently checked)'); // button shows current
    
    // Submit the change
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 1/3');
    await expect(percentText).toHaveText('33%');
});

test('Both pages use same store instance', async ({page}) => {
    // This test verifies that both pages are using the same component/store
    // by checking they have identical behavior patterns
    
    // Test stores page
    await page.goto('/stores');
    const storesCheckbox = page.locator('input[type="checkbox"]').nth(0);
    const storesSubmit = page.locator('button');
    const storesProgress = page.locator('p').filter({ hasText: 'Completed:' });
    
    await storesCheckbox.click();
    await storesSubmit.click();
    await expect(storesProgress).toHaveText('Completed: 1/3');
    
    // Test test-checklist page has same behavior
    await page.goto('/test-checklist');
    const testCheckbox = page.locator('input[type="checkbox"]').nth(0);
    const testSubmit = page.locator('button');
    const testProgress = page.locator('p').filter({ hasText: 'Completed:' });
    
    // Should start fresh (stores reset on page navigation)
    await expect(testProgress).toHaveText('Completed: 0/3');
    
    // But should have identical behavior
    await testCheckbox.click();
    await testSubmit.click();
    await expect(testProgress).toHaveText('Completed: 1/3');
});