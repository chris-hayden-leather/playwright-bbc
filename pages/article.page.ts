import { Locator, Page } from '@playwright/test';

export class Article {
  readonly maybeLater: Locator;

  readonly headline: Locator;

  readonly leadAsset: Locator;

  readonly leadAssetCaption: Locator;

  readonly byline: Locator;

  readonly publishedTime: Locator;

  readonly bodyTextContent: Locator;

  readonly getInTouchTitle: Locator;

  readonly getInTouchBtn: Locator;

  readonly relatedTopicSection: Locator;

  readonly relatedTopics: Locator;

  readonly moreOnThisStorySection: Locator;

  readonly moreOnThisContent: Locator;

  constructor(page: Page) {
    this.maybeLater = page.getByTestId('dismiss');
    this.headline = page.getByRole('heading', { level: 1 });
    this.leadAsset = page.locator('div [data-block="headline"] + div [data-testid="image"]');
    this.leadAssetCaption = this.leadAsset.getByRole('paragraph');
    this.byline = page.getByTestId('single-byline');
    this.publishedTime = page.getByTestId('metadata').getByRole('time');
    this.bodyTextContent = page.locator('[data-block="text"]').getByRole('paragraph');
    this.getInTouchTitle = page.getByRole('heading', { level: 2, name: 'Get in touch' });
    this.getInTouchBtn = page.getByRole('button', { name: 'Contact form' });
    this.relatedTopicSection = page.getByTestId('topic-list');
    this.relatedTopics = this.relatedTopicSection.getByRole('listitem');
    this.moreOnThisStorySection = page.locator('[data-block="promoList"]').filter({ has: page.getByTestId('promo') });
    this.moreOnThisContent = this.moreOnThisStorySection.getByRole('listitem');
  }
}
