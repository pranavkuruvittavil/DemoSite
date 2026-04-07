import { test, expect, type Page } from '@playwright/test';
import {
  expectBannerStylesMatch,
  logBannerStyles,
  readComputedStyles,
} from './utilities/banner-styles';

const QA1_ADMIN_BASE = 'https://qa2-admin.kilohub.com/login';

/**
 * Text inside the target table cell (default `sample.co.in`). Override with `KILOHUB_WEBSITE_URL`.
 */
const websiteUrl =
  process.env.KILOHUB_WEBSITE_URL ?? 'https://delightful-boba-2f6ebe.netlify.app/';

const RESULTS_WAIT_MS = 60_000;

/** Iframe that shows the CookieYes banner preview on the Customize tab */
const BANNER_PREVIEW_IFRAME = 'iframe[title="Banner Preview"]';

/**
 * Root element for style reads (preview + live). Override if your DOM differs:
 * `COOKIEYES_BANNER_SELECTOR=.cky-consent-container`
 */
const COOKIEYES_BANNER_SELECTOR =
  process.env.COOKIEYES_BANNER_SELECTOR ??
  '.cky-consent-container, .cky-consent-bar, #cky-consent';

const liveBannerSiteUrl = (): string => {
  const fromEnv = process.env.BANNER_LIVE_SITE_URL;
  if (fromEnv) {
    return fromEnv;
  }
  return websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
};

/** Extra delay after search so results/API can finish (ms). Override: KILOHUB_SEARCH_PAUSE_MS=3000 */
const SEARCH_PAUSE_MS = Math.max(
  0,
  Number.parseInt(process.env.KILOHUB_SEARCH_PAUSE_MS ?? '2500', 10) || 2500
);

const waitAfterSearch = async (page: Page) => {
  await page.waitForTimeout(SEARCH_PAUSE_MS);
};

test.use({
  actionTimeout: 60_000,
  navigationTimeout: 60_000,
  launchOptions: {
    slowMo: 200,
  },
});

test.describe('qa1-admin.kilohub.com (sample)', () => {
  test.describe.configure({ timeout: 120_000 });

  test('homepage responds and page renders', async ({ page, context }) => {
    test.slow();
    const response = await page.goto(QA1_ADMIN_BASE, {
      waitUntil: 'domcontentloaded',
    });

    expect(response, 'navigation should return a response').toBeTruthy();
    expect(response!.status(), `unexpected status: ${response!.status()}`).toBeLessThan(
      400
    );

    //await expect(page).toHaveURL(/qa1-admin\.kilohub\.com/);
    //await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name@company.com' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: '••••••••' })).toBeVisible();
    await page.getByRole('textbox', { name: 'name@company.com' }).fill('abhinav+admin@mozilor.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Abhinav@1');
    await page.getByRole('button', { name: 'Log In' }).click();

    //Dashboard page
//await expect(page).toHaveURL(/qa1-admin\.kilohub\.com\/dashboard/);
await expect(page.getByTestId('nav-search-tab')).toBeVisible();//Website search tab
await page.getByTestId('nav-search-tab').click();
await page.getByRole('textbox', { name: 'Email / Website Url / Website' }).click();
await page.getByRole('textbox', { name: 'Email / Website Url / Website' }).click();
await page.getByRole('textbox', { name: 'Email / Website Url / Website' }).fill('abhinav+chk@mozilor.com');
await page.getByRole('button', { name: 'Search' }).click();
await waitAfterSearch(page);



//await page.getByRole('button', { name: 'Search' }).click();

    // Target the cell that shows this URL, then click a button inside it (do not chain .click() off expect()).
    const websiteCell = page
      .getByRole('cell')
      .filter({ hasText: websiteUrl })
      .or(page.getByRole('gridcell').filter({ hasText: websiteUrl }))
      .first();

    await expect(
      websiteCell,
      `No cell containing "${websiteUrl}". Set KILOHUB_WEBSITE_URL to match visible text in the grid.`
    ).toBeVisible({ timeout: RESULTS_WAIT_MS });

    await websiteCell.getByRole('button').first().click();

    await page.getByTestId('nav-customize-tab').click();

    const previewFrame = page.frameLocator(BANNER_PREVIEW_IFRAME);
    const previewBanner = previewFrame.locator(COOKIEYES_BANNER_SELECTOR).first();
    const previewStyles = await readComputedStyles(previewBanner);
    logBannerStyles('admin preview (iframe)', previewStyles);

    const sitePage = await context.newPage();
    try {
      await sitePage.goto(liveBannerSiteUrl(), { waitUntil: 'domcontentloaded' });
      const liveBanner = sitePage.locator(COOKIEYES_BANNER_SELECTOR).first();
      await expect(liveBanner).toBeVisible({ timeout: 45_000 });
      const liveStyles = await readComputedStyles(liveBanner);
      logBannerStyles(`live site (${liveBannerSiteUrl()})`, liveStyles);

      expectBannerStylesMatch(previewStyles, liveStyles, { colorTolerance: 3 });
    } finally {
      await sitePage.close();
    }

// await expect(page.getByTestId('nav-user-search-tab')).toBeVisible();//User search tab

// await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();//Search button
// await page.getByTestId('nav-user-search-tab').click();
// await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();//User search input
// await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();//Search button
// await page.getByRole('textbox', { name: 'Email' }).click();
// await page.getByRole('textbox', { name: 'Email' }).fill('abhinav+chk@mozilor.com');
// await page.getByRole('button', { name: 'Search' }).click();
// await page.getByRole('link', { name: 'abhinav+chk@mozilor.com' }).click();

    
  });
});