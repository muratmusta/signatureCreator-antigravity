import { test, expect } from '@playwright/test';

test.describe('Navigation Basics', () => {

    test('should navigate to home page', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/SignatureOS/);
        await expect(page.getByText('Profesyonel Email İmzaları')).toBeVisible();
    });

    test('should navigate to login page', async ({ page }) => {
        await page.goto('/login');
        await expect(page).toHaveTitle(/Giriş Yap/);
        await expect(page.getByRole('heading', { name: 'Hoş Geldiniz' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Google ile Giriş Yap' })).toBeVisible();
    });

    test('should navigate to register page', async ({ page }) => {
        await page.goto('/register');
        await expect(page.getByRole('heading', { name: 'Hesap Oluşturun' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Google ile Kayıt Ol' })).toBeVisible();
    });

    test('should redirect unauthenticated user from dashboard to login', async ({ page }) => {
        await page.goto('/dashboard');
        // Expect redirect to login or home, depending on middleware
        await expect(page).toHaveURL(/\/login/);
    });

    test('should redirect unauthenticated user from editor to login', async ({ page }) => {
        await page.goto('/editor/new');
        await expect(page).toHaveURL(/\/login/);
    });

});
