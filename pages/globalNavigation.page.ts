import { Locator, Page } from '@playwright/test';

export class GlobalNavigation {
  readonly navigationMenu: Locator;

  readonly navigationMoreMenu: Locator;

  readonly navigationLogo: Locator;

  readonly accessibilityLinks: Locator;

  readonly accountMenu: Locator;

  readonly navigationLinks: Locator;

  readonly moreMenuBtn: Locator;

  constructor(page: Page) {
    this.navigationMenu = page.locator('#global-navigation');
    this.navigationMoreMenu = page.locator('#global-navigation-more-menu');
    this.navigationLogo = this.navigationMenu.getByRole('link', { name: 'BBC Homepage' });
    this.accessibilityLinks = page.locator('#accessibility-links');
    this.accountMenu = this.navigationMenu.getByRole('list').filter({ hasText: 'Sign in' });
    this.navigationLinks = this.navigationMenu.getByRole('list').filter({ has: page.getByRole('link', { name: 'News' }) });
    this.moreMenuBtn = this.navigationMenu.getByRole('button', { name: 'More menu' });
  }
}
