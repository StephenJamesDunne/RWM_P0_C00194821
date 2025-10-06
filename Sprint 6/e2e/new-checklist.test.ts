import {test, expect} from '@playwright/test';

test('Checklist deterministic edge cases', async ({page}) => {
    await page.goto('/test-checklist');

    const progressText = page.locator('p').filter({ hasText: 'Progress:' });
    const submitButton = page.locator('button');
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    const checkbox3 = page.locator('input[type="checkbox"]').nth(2);

    // Initial state: None checked -> Submit -> 0%
    await expect(progressText).toHaveText('Progress: 0/3 (0%)');
    await submitButton.click();
    await expect(progressText).toHaveText('Progress: 0/3 (0%)');

    // Edge case 1: Submit with 1 box checked -> 33%
    await checkbox1.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Progress: 1/3 (33%)');

    // Edge case 2: Change selection (uncheck one, check two others) -> Submit -> 67%
    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Progress: 2/3 (67%)');

    // Edge case 3: All checked -> Submit -> 100%
    await checkbox1.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Progress: 3/3 (100%)');

    // Edge case 4: None checked -> Submit -> 0%
    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await submitButton.click();
    await expect(progressText).toHaveText('Progress: 0/3 (0%)');

    await checkbox1.click();
    await checkbox2.click();
    await expect(progressText).toHaveText('Progress: 0/3 (0%)');
});