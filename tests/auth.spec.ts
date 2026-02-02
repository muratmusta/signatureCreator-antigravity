import { test, expect } from '@playwright/test';

test.describe('Authentication Pages', () => {

    test('Login page should display correctly', async ({ page }) => {
        await page.goto('/login');

        // Check header
        await expect(page.getByText('Hoş Geldiniz', { exact: true })).toBeVisible();

        // Check Google button
        await expect(page.getByRole('button', { name: 'Google ile Giriş Yap' })).toBeVisible();

        // Check links
        await expect(page.getByRole('link', { name: 'Kayıt Olun' })).toBeVisible();
    });

    test('Register page should display correctly', async ({ page }) => {
        await page.goto('/register');

        // Check header
        await expect(page.getByText('Hesap Oluşturun', { exact: true })).toBeVisible();

        // Check Google button
        await expect(page.getByRole('button', { name: 'Google ile Kayıt Ol' })).toBeVisible();

        // Check links
        await expect(page.getByRole('link', { name: 'Giriş Yapın' })).toBeVisible();
    });

});
