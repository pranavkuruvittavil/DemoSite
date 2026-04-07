import { expect, type Locator } from '@playwright/test';

type BannerStyles = {
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
};

type MatchOptions = {
  colorTolerance?: number;
};

const COLOR_REGEX =
  /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*[,/]\s*([0-9]*\.?[0-9]+))?\s*\)$/i;

const parseRgba = (value: string): [number, number, number, number] | null => {
  const match = value.trim().match(COLOR_REGEX);
  if (!match) {
    return null;
  }

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const a = match[4] === undefined ? 1 : Number(match[4]);
  return [r, g, b, Number.isFinite(a) ? a : 1];
};

const normalize = (value: string): string => value.trim().replace(/\s+/g, ' ');

const closeEnough = (a: number, b: number, tolerance: number): boolean =>
  Math.abs(a - b) <= tolerance;

export const readComputedStyles = async (banner: Locator): Promise<BannerStyles> => {
  const root = banner.first();
  const button = root.locator('button').first();

  const [bannerStyles, buttonStyles] = await Promise.all([
    root.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        textColor: styles.color,
        borderRadius: styles.borderRadius,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
      };
    }),
    button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        buttonBackgroundColor: styles.backgroundColor,
        buttonTextColor: styles.color,
      };
    }),
  ]);

  return {
    ...bannerStyles,
    ...buttonStyles,
  };
};

export const logBannerStyles = (label: string, styles: BannerStyles): void => {
  console.log(`[banner-styles] ${label}`);
  console.table(styles);
};

export const expectBannerStylesMatch = (
  expected: BannerStyles,
  actual: BannerStyles,
  options: MatchOptions = {}
): void => {
  const tolerance = options.colorTolerance ?? 0;

  const keys = Object.keys(expected) as Array<keyof BannerStyles>;
  for (const key of keys) {
    const expectedValue = normalize(expected[key]);
    const actualValue = normalize(actual[key]);

    const expectedColor = parseRgba(expectedValue);
    const actualColor = parseRgba(actualValue);

    if (expectedColor && actualColor) {
      expect(
        closeEnough(expectedColor[0], actualColor[0], tolerance) &&
          closeEnough(expectedColor[1], actualColor[1], tolerance) &&
          closeEnough(expectedColor[2], actualColor[2], tolerance),
        `Color mismatch for "${key}": expected ${expectedValue}, got ${actualValue}`
      ).toBeTruthy();

      expect(
        closeEnough(expectedColor[3], actualColor[3], 0.02),
        `Alpha mismatch for "${key}": expected ${expectedValue}, got ${actualValue}`
      ).toBeTruthy();
    } else {
      expect(actualValue, `Style mismatch for "${key}"`).toBe(expectedValue);
    }
  }
};
