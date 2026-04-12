import { Page } from '@playwright/test';
import { Home } from '@pageObjects/home.page';

export const homePage = {
  homePage: async ({ page }: { page: Page }, use: (nav: Home) => Promise<void>) => {
    const home = new Home(page);
    await use(home);
  },
};
