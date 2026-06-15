import { test, expect } from '@playwright/test';

// Tailwind md: breakpoint — determines which preview variant renders
const MD_BREAKPOINT = 768;

test.describe('Timing tower preview visibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForSelector('[role="button"]', { state: 'attached', timeout: 10000 });
  });

  test('clicking a row makes the preview panel visible with content', async ({ page }) => {
    const { width } = page.viewportSize()!;
    const isNarrow = width < MD_BREAKPOINT;

    const firstRow = page.locator('[role="button"]').first();
    await firstRow.click();
    await page.waitForTimeout(600);

    const testId = isNarrow ? 'mobile-preview' : 'desktop-preview';
    const preview = page.getByTestId(testId);
    await expect(preview).toBeVisible();

    const box = await preview.boundingBox();
    expect(box, 'preview should have a bounding box').not.toBeNull();
    expect(box!.height, 'preview should have non-zero height').toBeGreaterThan(0);
    expect(box!.width, 'preview should have non-zero width').toBeGreaterThan(isNarrow ? 0 : 10);
  });

  test('preview CTA link is visible and clickable', async ({ page }) => {
    const { width } = page.viewportSize()!;
    const testId = width < MD_BREAKPOINT ? 'mobile-preview' : 'desktop-preview';

    const firstRow = page.locator('[role="button"]').first();
    await firstRow.click();
    await page.waitForTimeout(600);

    const preview = page.getByTestId(testId);
    const cta = preview.locator('a').filter({ hasText: /View Project|Read on Get Goalside/ });

    await expect(cta).toBeVisible();

    const ctaBox = await cta.boundingBox();
    expect(ctaBox, 'CTA should have a bounding box').not.toBeNull();
    expect(ctaBox!.height, 'CTA should have non-zero height').toBeGreaterThan(0);
    expect(ctaBox!.width, 'CTA should have non-zero width').toBeGreaterThan(0);
  });

  test('preview description text is visible', async ({ page }) => {
    const { width } = page.viewportSize()!;
    const testId = width < MD_BREAKPOINT ? 'mobile-preview' : 'desktop-preview';

    const firstRow = page.locator('[role="button"]').first();
    await firstRow.click();
    await page.waitForTimeout(600);

    const preview = page.getByTestId(testId);
    const description = preview.locator('p').first();

    await expect(description).toBeVisible();

    const descBox = await description.boundingBox();
    expect(descBox, 'description should have a bounding box').not.toBeNull();
    expect(descBox!.height, 'description should have non-zero height').toBeGreaterThan(0);
  });

  test('preview thumbnail image is visible', async ({ page }) => {
    const { width } = page.viewportSize()!;
    const testId = width < MD_BREAKPOINT ? 'mobile-preview' : 'desktop-preview';

    const firstRow = page.locator('[role="button"]').first();
    await firstRow.click();
    await page.waitForTimeout(600);

    const preview = page.getByTestId(testId);
    const img = preview.locator('img');

    await expect(img).toBeVisible();

    const imgBox = await img.boundingBox();
    expect(imgBox, 'thumbnail should have a bounding box').not.toBeNull();
    expect(imgBox!.height, 'thumbnail should have non-zero height').toBeGreaterThan(0);
    expect(imgBox!.width, 'thumbnail should have non-zero width').toBeGreaterThan(0);
  });
});
