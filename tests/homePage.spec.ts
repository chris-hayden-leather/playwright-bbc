import { expect, test } from '@fixtures';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('masthead welcome message is displayed', async ({ page }) => {
    await expect(page.getByText('Welcome to the BBC')).toBeVisible();
  });

  test('headline stories are correctly displayed', async ({ homePage }) => {
    await expect(homePage.headlineContentCard.first()).toBeVisible();
    expect(await homePage.headlineContentCard.count()).toBeGreaterThan(0);
  });

  test('headline stories show LIVE pulse correctly', async ({ homePage }) => {
    await expect(homePage.headlineContentCard.first()).toBeVisible();
    const headlineContentCount = await homePage.headlineContentCard.count();
    for (let s = 0; s < headlineContentCount; s++) {
      const card = homePage.headlineContentCard.nth(s);
      const storyType = await card.getAttribute('type');
      await test.step('pulse is shown if content type is live', async () => {
        if (storyType === 'live') await expect(card.locator('span[class*="LivePulse"]')).toBeVisible();
      });
      await test.step('pulse is not shown on other content types', async () => {
        if (storyType !== 'live') await expect(card.locator('span[class*="LivePulse"]')).toBeHidden();
      });
    }
  });

  test('headline story cards link to an article', async ({ homePage, page }) => {
    const card = homePage.headlineContentCard.first();
    const cardLink = await card.getByRole('link').first().getAttribute('href');
    expect(cardLink).not.toBeNull();
    await card.click();
    await expect(page).toHaveURL(cardLink!);
  });
});
