import { expect, test } from '@fixtures';

test.describe('Article page', () => {
  test('displays hero features', async ({ article }) => {
    await test.step('headline is displayed', async () => {
      await expect(article.headline).toBeVisible();
    });
    await test.step('lead asset and caption are displayed', async () => {
      await expect(article.leadAsset).toBeVisible();
      await expect(article.leadAssetCaption).toBeVisible();
    });
    await test.step('byline is displayed', async () => {
      await expect(article.byline).toBeVisible();
    });
    await test.step('published time is displayed', async () => {
      await expect(article.publishedTime).toBeVisible();
    });
  });

  test('displays article body content', async ({ article }) => {
    await expect(article.bodyTextContent.first()).toBeVisible();
    expect(await article.bodyTextContent.count()).toBeGreaterThan(2);
  });

  test('displays Get In Touch CTA', async ({ article }) => {
    await expect(article.getInTouchTitle).toBeVisible();
    await expect(article.getInTouchBtn).toBeVisible();
  });

  test('displays a Related Topic section', async ({ article }) => {
    await expect(article.relatedTopicSection).toBeVisible();
    await expect(article.relatedTopics.first()).toBeVisible();
    expect(await article.relatedTopics.count()).toBeGreaterThan(0);
  });

  test('displays More on this story section', async ({ article }) => {
    await expect(article.moreOnThisStorySection).toBeVisible();
    expect(await article.moreOnThisContent.count()).toBeGreaterThan(0);
  });
});
