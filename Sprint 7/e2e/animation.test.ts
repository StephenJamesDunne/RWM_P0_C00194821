import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/stores');
    
    // Reset all checkboxes
    const checkboxes = page.getByRole('checkbox');
    const count = await checkboxes.count();
    
    for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        if (await checkbox.isChecked()) {
            await checkbox.click();
        }
    }
    
    // Submit to reset state
    await page.getByRole('button', { name: /submit/i }).click();
});

test('Progress bar animation: immediate target + animated transition', async ({page}) => {
    const setupCheckbox = page.getByRole('checkbox', { name: /complete project setup/i });
    const testsCheckbox = page.getByRole('checkbox', { name: /write tests/i });
    const submitButton = page.getByRole('button', { name: /submit/i });
    
    const percentText = page.getByTestId('percent');
    const targetBar = page.locator('.progress-bar-target');
    const animatedBar = page.locator('.progress-bar-animated');

    // Check 2 out of 3 boxes (should be 67%)
    await setupCheckbox.click();
    await testsCheckbox.click();

    // Submit and immediately check that target snaps to 67%
    await submitButton.click();
    await expect(percentText).toHaveText('67%');
    
    // Target bar should immediately snap to 67%
    await expect(targetBar).toHaveAttribute('style', /width:\s*67%/);
    
    // Animated bar should start animating (has the 'animating' class)
    await expect(animatedBar).toHaveClass(/animating/);
    
    // Poll the animated bar's width until it reaches 67% (within 1 second)
    await expect(async () => {
        const animatedStyle = await animatedBar.getAttribute('style');
        expect(animatedStyle).toMatch(/width:\s*67%/);
    }).toPass({ timeout: 1200 }); // Allow 1.2s for 1s animation + buffer

    // Wait for the animating class to be removed using waitFor
    await page.waitForFunction(
        () => {
            const element = document.querySelector('.progress-bar-animated');
            return element && !element.classList.contains('animating');
        },
        { timeout: 1500 }
    );
    
    // After animation completes, the 'animating' class should be removed
    await expect(animatedBar).not.toHaveClass(/animating/, { timeout: 1200 });
});