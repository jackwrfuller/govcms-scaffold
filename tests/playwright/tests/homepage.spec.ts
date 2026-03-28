import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should return a 200 status', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('should have a page title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should contain a main content area', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main, #main, #main-content, [role="main"]').first()).toBeVisible();
  });
});
