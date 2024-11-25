import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://crewnetwork.org/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByPlaceholder('Enter your Email').fill('doug.brown@catalystfire.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('Enter your Password').fill('Asdf1@#$');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('button', { name: 'Doug' })).toBeVisible();
});