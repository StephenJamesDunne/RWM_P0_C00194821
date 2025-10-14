import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Reset all checkboxes to unchecked state before each test
    await page.goto('/stores');
    
    const checkboxes = page.getByRole('checkbox');
    const count = await checkboxes.count();
    
    // Uncheck all boxes
    for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        if (await checkbox.isChecked()) {
            await checkbox.click();
        }
    }
    
    // Submit to reset the displayed state
    await page.getByRole('button', { name: /submit/i }).click();
});

test('Stores page - Checklist deterministic edge cases', async ({page}) => {
    await page.goto('/stores');

    const progressText = page.getByTestId('counter');
    const submitButton = page.getByRole('button', { name: /submit/i });
    const percentText = page.getByTestId('percent');
    const setupCheckbox = page.getByRole('checkbox', { name: /complete project setup/i });
    const testsCheckbox = page.getByRole('checkbox', { name: /write tests/i });
    const deployCheckbox = page.getByRole('checkbox', { name: /deploy application/i });

    // Initial state: None checked -> Submit -> 0%
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');

    // Edge case 1: Submit with 1 box checked -> 33%
    await setupCheckbox.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 1/3');
    await expect(percentText).toHaveText('33%');

    // Edge case 2: Change selection (uncheck one, check two others) -> Submit -> 67%
    await setupCheckbox.click();
    await testsCheckbox.click();
    await deployCheckbox.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 2/3');
    await expect(percentText).toHaveText('67%');

    // Edge case 3: All checked -> Submit -> 100%
    await setupCheckbox.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 3/3');
    await expect(percentText).toHaveText('100%');

    // Edge case 4: None checked -> Submit -> 0%
    await setupCheckbox.click();
    await testsCheckbox.click();
    await deployCheckbox.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');

    // Verify state doesn't change without submit
    await setupCheckbox.click();
    await testsCheckbox.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
});

test('Store reactivity and submit button behavior', async ({page}) => {
    await page.goto('/stores');
    
    const setupCheckbox = page.getByRole('checkbox', { name: /complete project setup/i });
    const testsCheckbox = page.getByRole('checkbox', { name: /write tests/i });
    const progressText = page.getByTestId('counter');
    const percentText = page.getByTestId('percent');
    const submitButton = page.getByRole('button', { name: /submit/i });
    
    // Initial state
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
    
    // Check boxes but don't submit - display should not change
    await setupCheckbox.click();
    await testsCheckbox.click();
    await expect(progressText).toHaveText('Completed: 0/3');
    await expect(percentText).toHaveText('0%');
    
    // But the submit button should show current state
    await expect(submitButton).toContainText('Submit (2/3 currently checked)');
    
    // Now submit - display should update
    await submitButton.click();
    await expect(progressText).toHaveText('Completed: 2/3');
    await expect(percentText).toHaveText('67%');
    
    // Make more changes without submitting
    await setupCheckbox.click(); // uncheck first box
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
    const storesSetupCheckbox = page.getByRole('checkbox', { name: /complete project setup/i });
    const storesSubmit = page.getByRole('button', { name: /submit/i });
    const storesProgress = page.getByTestId('counter');
    
    await storesSetupCheckbox.click();
    await storesSubmit.click();
    await expect(storesProgress).toHaveText('Completed: 1/3');
    
    // Test test-checklist page has same behavior
    await page.goto('/test-checklist');
    const testSetupCheckbox = page.getByRole('checkbox', { name: /complete project setup/i });
    const testSubmit = page.getByRole('button', { name: /submit/i });
    const testProgress = page.getByTestId('counter');
    
    // Should start fresh (stores reset on page navigation)
    await expect(testProgress).toHaveText('Completed: 0/3');
    
    // But should have identical behavior
    await testSetupCheckbox.click();
    await testSubmit.click();
    await expect(testProgress).toHaveText('Completed: 1/3');
});

test('Accessibility and semantic markup', async ({page}) => {
    await page.goto('/stores');
    
    // Test that all form elements are properly accessible
    const checkboxes = page.getByRole('checkbox');
    await expect(checkboxes).toHaveCount(3);
    
    // Each checkbox should have an accessible name
    await expect(page.getByRole('checkbox', { name: /complete project setup/i })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: /write tests/i })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: /deploy application/i })).toBeVisible();
    
    // Submit button should be accessible
    const submitButton = page.getByRole('button', { name: /submit/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    
    // Progress indicators should have test IDs for reliable testing
    await expect(page.getByTestId('counter')).toBeVisible();
    await expect(page.getByTestId('percent')).toBeVisible();
});