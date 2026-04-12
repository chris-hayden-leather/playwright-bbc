import { expect, test } from '@fixtures';
import { menuItems } from '@testdata/globalNavigation.data';
import { MOBILE_BREAKPOINT_PX } from '@testdata/constants';

test.describe('Global Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo is visible and links to the home page', async ({ environmentBaseURL, globalNavigation }) => {
    await expect(globalNavigation.navigationLogo).toBeVisible();
    await expect(globalNavigation.navigationLogo).toHaveAttribute('href', environmentBaseURL);
  });

  test('links are visible and link to the expected path', async ({ environmentBaseURL, globalNavigation, viewportWidth }) => {
    await expect(globalNavigation.accountMenu).toBeVisible();
    if (viewportWidth < MOBILE_BREAKPOINT_PX) await expect(globalNavigation.navigationLinks).toBeHidden();
    await globalNavigation.moreMenuBtn.click();
    await expect(globalNavigation.navigationMoreMenu).toBeVisible();
    for (const link of menuItems) {
      const linkLocator = globalNavigation.navigationMenu.getByRole('link', { name: link.label, exact: true })
        .or(globalNavigation.navigationMoreMenu.getByRole('link', { name: link.label, exact: true }));
      await expect(linkLocator).toBeVisible();
      await expect(linkLocator).toHaveAttribute('href', `${environmentBaseURL}${link.path}`);
    }
  });
});
