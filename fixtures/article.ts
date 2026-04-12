import { Page } from '@playwright/test';
import { Article } from '@pageObjects/article.page';
import { articleData } from '@testdata/article.data';

export const article = {
  article: async ({ page }: { page: Page }, use: (a: Article) => Promise<void>) => {
    const articlePage = new Article(page);
    await page.goto(articleData.url);
    if (await articlePage.maybeLater.isVisible()) await articlePage.maybeLater.click();
    await use(articlePage);
  },
};