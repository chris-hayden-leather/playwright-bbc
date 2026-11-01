# BBC Playwright Test Suite

A Playwright + TypeScript automation suite covering key user-facing features of [bbc.co.uk](https://www.bbc.co.uk).

---

## Stack

- [Playwright](https://playwright.dev/) - test runner and browser automation
- TypeScript
- Node.js

---

## Project Structure

```
├── fixtures/               # Custom fixture definitions
│   ├── index.ts            # Base fixture — context, cookie injection, shared fixtures
│   ├── article.ts
│   ├── globalNavigation.ts
│   └── homePage.ts
├── pages/                  # Page objects
│   ├── article.page.ts
│   ├── globalNavigation.page.ts
│   └── home.page.ts
├── tests/                  # Spec files
│   ├── article.spec.ts
│   ├── globalNavigation.spec.ts
│   └── homePage.spec.ts
├── test-data/              # Test data and constants
│   ├── article.data.ts
│   ├── globalNavigation.data.ts
│   └── constants.ts
└── playwright.config.ts
```

---

## Test Coverage

### Global Navigation
- Logo is visible and href resolves to the environment base URL
- All nav links are present and resolve to expected paths (handles visible and overflow menu items)
- Account menu is present
- Mobile viewport collapses navigation links

### Home Page
- Masthead welcome message is displayed
- Headline content cards are present
- Live story cards display the LIVE pulse indicator; non-live cards do not

### Article Page
- Hero features: headline, lead asset, caption, byline, published timestamp
- Article body content is present and non-empty
- Related Topics section is present with at least one topic
- More on this Story section is present with at least one item
- Get in Touch CTA is present

---

## Architecture Decisions

### Environment-agnostic by design

Tests are not coupled to `bbc.co.uk` specifically. `baseURL` is defined per project in the `use` block of `playwright.config.ts` and exposed via an `environmentBaseURL` fixture. Adding a staging equivalent of each project requires only a new project entry with a different `baseURL` with no test changes required.

### Navigation and setup

A hybrid approach is used depending on the spec. Where all tests in a spec use a page fixture (e.g. article), the fixture handles navigation and any pre-test setup (such as dismissing the sign-in prompt) before yielding to the test. Where some tests only require `page` directly and have no use for the page object fixture, `beforeEach` handles navigation instead, avoiding the fixture `goto` being skipped for tests that don't destructure it.

### Session cookie injection

The `ckns_explicit` cookie (BBC's explicit consent cookie) is injected at the context level in the base fixture. This accepts cookies programmatically, avoiding the consent banner interfering with test assertions across all specs.

### Data-driven nav link tests

Nav link labels and paths are maintained in `test-data/globalNavigation.data.ts`. The test iterates over this data and resolves links against whichever container they appear in, either the visible nav or overflow "more" menu using Playwright's `.or()` locator. This means the test is resilient to BBC reshuffling which links are visible vs. overflow at different viewport widths.

### Locator strategy

- `getByRole` with meaningful names preferred over positional selectors
- `data-testid` attributes used where available
- Partial class attribute selectors (`[class*="..."]`) used sparingly where no testid exists
- Adjacent sibling combinator (`h1 + div`) used to scope the lead asset image to the headline block specifically, avoiding false matches with other images further down the article

---

## Projects

Three browser projects are configured in `playwright.config.ts`:

| Project | Device |
|---|---|
| mobile-production | Pixel 7 |
| tablet-production | iPad (11th gen) |
| desktop-production | Chrome |

Run a specific project:

```bash
npx playwright test --project=desktop-production
```

---

## Running the Suite

Install dependencies:

```bash
npm install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run with UI mode:

```bash
npx playwright test --ui
```

View the last report:

```bash
npx playwright show-report
```

---

## Deliberate Omissions

- **Sign-in prompts** — where a "Maybe Later" sign-in prompt appears (e.g. on article pages), it is dismissed programmatically in the fixture before tests run. Account authentication is not tested.
- **Exact content assertions** — headline text, image src, and story counts are not asserted against specific values; bbc.co.uk is a live content environment and content changes constantly, particularly recently published content
- **Accessibility** — not covered in this suite, but a natural extension would be integrating `@axe-core/playwright` for automated a11y checks on key page templates

---

## Potential Extensions

- API-level validation of BBC content feeds
- Axe-core accessibility checks on key page templates
- BBC Sounds and iPlayer page structure tests (navigation, content tiles, metadata but not playback)
