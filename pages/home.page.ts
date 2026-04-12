import { Locator, Page } from '@playwright/test';

export class Home {
  readonly mainContent: Locator;

  readonly headlineContent: Locator;

  readonly headlineContentCard: Locator;

  constructor(page: Page) {
    this.mainContent = page.getByTestId('main-content');
    // No data-testid on the headline shelf — .first() is the best bet here.
    // Will need to revisit if any further lists are added at the top of the page.
    this.headlineContent = this.mainContent.getByRole('list').first();
    this.headlineContentCard = this.headlineContent.getByTestId('promo');
  }
}
