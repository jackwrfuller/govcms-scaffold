import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should have a site header', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header, [role="banner"]').first()).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    const navLinks = page.locator('nav a, [role="navigation"] a');
    await expect(navLinks.first()).toBeVisible();
  });

  test('should have a footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer, [role="contentinfo"]').first()).toBeVisible();
  });
});
