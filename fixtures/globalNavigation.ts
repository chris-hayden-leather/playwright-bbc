import { Page } from '@playwright/test';
import { GlobalNavigation } from '@pageObjects/globalNavigation.page';

export const globalNavigation = {
  globalNavigation: async ({ page }: { page: Page }, use: (nav: GlobalNavigation) => Promise<void>) => {
    const nav = new GlobalNavigation(page);
    await use(nav);
  },
};
