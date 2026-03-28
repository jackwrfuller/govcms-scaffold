import { test, expect } from '@playwright/test';

test.describe('Basic accessibility', () => {
  test('should have a lang attribute on html element', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('should have alt attributes on images', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('should have a skip to content link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main-content"], a[href="#content"], a.skip-link');
    // Skip link may be visually hidden but should exist in the DOM.
    expect(await skipLink.count()).toBeGreaterThan(0);
  });
});
