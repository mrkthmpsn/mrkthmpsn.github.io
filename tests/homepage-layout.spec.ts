import { test, expect } from '@playwright/test';

const PITCH_SVG = '#animation-container svg';

test.describe('Homepage pitch layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // Wait for d3-soccer to create the pitch SVG
    await page.waitForSelector(PITCH_SVG, { state: 'attached', timeout: 15000 });
    // Give d3 a moment to finish sizing
    await page.waitForTimeout(1000);
  });

  test('pitch does not overlap the navbar', async ({ page }) => {
    const navbar = page.locator('nav');
    const navbarBox = await navbar.boundingBox();
    expect(navbarBox, 'navbar should be visible').not.toBeNull();

    const svg = page.locator(PITCH_SVG);
    const svgBox = await svg.boundingBox();
    expect(svgBox, 'pitch SVG should be visible').not.toBeNull();

    const navbarBottom = navbarBox!.y + navbarBox!.height;
    const gap = svgBox!.y - navbarBottom;

    console.log(`Viewport: ${page.viewportSize()!.width}x${page.viewportSize()!.height}`);
    console.log(`Navbar bottom: ${navbarBottom}px`);
    console.log(`Pitch top: ${svgBox!.y}px`);
    console.log(`Gap: ${gap}px`);

    // Pitch should not overlap the navbar
    expect(gap, `Pitch overlaps navbar by ${Math.abs(gap)}px`).toBeGreaterThanOrEqual(0);
  });

  test('pitch is not excessively far from the navbar', async ({ page }) => {
    const viewport = page.viewportSize()!;
    const navbar = page.locator('nav');
    const navbarBox = await navbar.boundingBox();
    expect(navbarBox, 'navbar should be visible').not.toBeNull();

    const svg = page.locator(PITCH_SVG);
    const svgBox = await svg.boundingBox();
    expect(svgBox, 'pitch SVG should be visible').not.toBeNull();

    const navbarBottom = navbarBox!.y + navbarBox!.height;
    const gap = svgBox!.y - navbarBottom;

    console.log(`Viewport: ${viewport.width}x${viewport.height}`);
    console.log(`Navbar bottom: ${navbarBottom}px`);
    console.log(`Pitch top: ${svgBox!.y}px`);
    console.log(`Gap: ${gap}px (max allowed: ${viewport.height * 0.25}px)`);

    // Gap between navbar and pitch should not exceed 25% of viewport height
    expect(gap, `Gap ${gap}px exceeds 25% of viewport height`).toBeLessThan(viewport.height * 0.25);
  });

  test('pitch is visible within the viewport', async ({ page }) => {
    const viewport = page.viewportSize()!;

    const svg = page.locator(PITCH_SVG);
    const svgBox = await svg.boundingBox();
    expect(svgBox, 'pitch SVG should be visible').not.toBeNull();

    console.log(`Viewport: ${viewport.width}x${viewport.height}`);
    console.log(`Pitch: y=${svgBox!.y}, height=${svgBox!.height}, bottom=${svgBox!.y + svgBox!.height}`);

    // At least the top portion of the pitch should be within the viewport
    expect(svgBox!.y, 'Pitch starts below viewport').toBeLessThan(viewport.height);
    expect(svgBox!.y + svgBox!.height, 'Pitch ends above viewport').toBeGreaterThan(0);
  });
});
