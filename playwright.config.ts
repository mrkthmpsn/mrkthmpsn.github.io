import { defineConfig, devices } from '@playwright/test';

const viewports = [
  { name: 'mobile-portrait', width: 390, height: 844 },
  { name: 'mobile-landscape', width: 844, height: 390 },
  { name: 'desktop-small', width: 1280, height: 720 },
  { name: 'desktop-large', width: 1920, height: 1080 },
];

const browsers = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? undefined : 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: viewports.flatMap((vp) =>
    browsers.map((browser) => ({
      name: `${vp.name}-${browser.name}`,
      use: {
        ...browser.use,
        viewport: { width: vp.width, height: vp.height },
      },
    }))
  ),
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
