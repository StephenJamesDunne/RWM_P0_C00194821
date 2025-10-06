import { test, expect } from '@playwright/test';

test('Checklist basic functionality', async ({ page }) => {
  await page.goto('/test-checklist');
  
  const progressText = page.locator('p').filter({ hasText: 'Progress:' });
  const submitButton = page.locator('button');
  const firstCheckbox = page.locator('input[type="checkbox"]').first();
  
  // Check initial state
  await expect(progressText).toHaveText('Progress: 0/3 (0%)');
  
  // Check a box and submit
  await firstCheckbox.click();
  await submitButton.click();
  
  // Progress should update
  await expect(progressText).toHaveText('Progress: 1/3 (33%)');
});