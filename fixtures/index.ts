import { test as base } from '@playwright/test';
import { article } from '@fixtures/article';
import { globalNavigation } from '@fixtures/globalNavigation';
import { homePage } from '@fixtures/homePage';
import { Article } from '@pageObjects/article.page';
import { GlobalNavigation } from '@pageObjects/globalNavigation.page';
import { Home } from '@pageObjects/home.page';

type ExtendedFixtures = {
  article: Article;
  environmentBaseURL: string;
  deviceIsMobile: boolean;
  globalNavigation: GlobalNavigation;
  homePage: Home;
  viewportWidth: number;
};

export const test = base.extend<ExtendedFixtures>({
  environmentBaseURL: async ({}, use, testInfo) => {
    const url = testInfo.project.use.baseURL!;
    await use(url);
  },
  deviceIsMobile: async ({}, use, testInfo) => {
    const isMobile = testInfo.project.use.isMobile!;
    await use(isMobile);
  },
  viewportWidth: async ({}, use, testInfo) => {
    const width = testInfo.project.use.viewport?.width!;
    await use(width);
  },
  // ckns_explicit=1 bypasses the cookie-consent banner
  context: async ({ browser }, use, testInfo) => {
    const contextOptions = testInfo.project.use;
    const context = await browser.newContext(contextOptions);
    await context.addCookies([{ name: 'ckns_explicit', value: '1', domain: '.bbc.co.uk', path: '/' }]);
    await use(context);
    await context.close();
  },
  ...article,
  ...globalNavigation,
  ...homePage,
});

export { expect } from '@playwright/test';
