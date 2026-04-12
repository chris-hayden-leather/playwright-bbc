import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: true,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'mobile-production',
      use: {
        baseURL: 'https://www.bbc.co.uk',
        ...devices['Pixel 7'],
      },
    },

    {
      name: 'tablet-production',
      use: {
        baseURL: 'https://www.bbc.co.uk',
        ...devices['iPad (gen 11)']},
    },
    {
      name: 'desktop-production',
      use: {
        baseURL: 'https://www.bbc.co.uk',
        ...devices['Desktop Chrome']},
    },
  ],
});
