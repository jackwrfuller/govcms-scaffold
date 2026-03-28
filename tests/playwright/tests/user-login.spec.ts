import { test, expect } from '@playwright/test';

test.describe('User login page', () => {
  test('should render the login form', async ({ page }) => {
    await page.goto('/user/login');
    await expect(page.locator('#user-login-form, form[action*="user/login"]').first()).toBeVisible();
  });

  test('should have username and password fields', async ({ page }) => {
    await page.goto('/user/login');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="pass"]')).toBeVisible();
  });

  test('should show an error for invalid credentials', async ({ page }) => {
    await page.goto('/user/login');
    await page.fill('input[name="name"]', 'invalid_user');
    await page.fill('input[name="pass"]', 'invalid_pass');
    await page.click('input[type="submit"], button[type="submit"]');
    await expect(page.locator('.messages--error, .messages.error').first()).toBeVisible();
  });
});
