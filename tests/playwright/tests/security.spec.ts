import { test, expect } from '@playwright/test';

test.describe('Security headers', () => {
  test('should have X-Frame-Options header', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();
    expect(headers?.['x-frame-options']).toBeTruthy();
  });

  test('should have X-Content-Type-Options header', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();
    expect(headers?.['x-content-type-options']).toBe('nosniff');
  });
});

test.describe('Restricted paths', () => {
  test('should deny access to /admin for anonymous users', async ({ page }) => {
    const response = await page.goto('/admin');
    // Should redirect to login or return 403.
    const url = page.url();
    const status = response?.status() ?? 0;
    expect(url.includes('/user/login') || status === 403).toBeTruthy();
  });

  test('should return 404 for install.php', async ({ page }) => {
    const response = await page.goto('/core/install.php');
    const status = response?.status() ?? 0;
    // Nginx should block this or Drupal should redirect.
    expect([403, 404].includes(status) || page.url().includes('/user/login')).toBeTruthy();
  });
});
