import { test, expect } from '@playwright/test';

const env =
  (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }).process?.env ?? {};

const LOG_API_URL = 'https://log-staging.cookieyes.com/api/v1/log';
const SITE_URL = env.SITE_URL ?? 'https://delightful-boba-2f6ebe.netlify.app';

/** Number of times to load the page and verify the log API. Override with RELOAD_COUNT env var. */
const RELOAD_COUNT = parseInt(env.RELOAD_COUNT ?? '100', 10);

test.describe('Reload and verify log API', () => {
  test(`should call log API on each of ${RELOAD_COUNT} page loads`, async ({ page }) => {
    for (let i = 0; i < RELOAD_COUNT; i++) {
      const iteration = i + 1;
      console.log(`\n[${iteration}/${RELOAD_COUNT}] Loading page...`);

      const logApiResponse = page.waitForResponse(
        (response) => response.url().startsWith(LOG_API_URL),
        { timeout: 15000 }
      );

      if (i === 0) {
        await page.goto(SITE_URL, { waitUntil: 'domcontentloaded' });
      } else {
        await page.reload({ waitUntil: 'domcontentloaded' });
      }

      const response = await logApiResponse;
      expect(response.status()).toBeLessThan(400);
      console.log(`[${iteration}/${RELOAD_COUNT}] ✓ Log API called (${response.status()})`);

    }
  });
});