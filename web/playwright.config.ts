import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // Two workers plus the server is what this hardware sustains; more produces
  // resource failures rather than faster runs.
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  /**
   * One retry, locally as well as in CI.
   *
   * The suite runs 500+ tests across three viewports against a production
   * server that transcodes images on demand. Under that load this machine
   * intermittently refuses a socket (ERR_INSUFFICIENT_RESOURCES) and the
   * browser lands on a blank page, which fails an assertion that has nothing
   * to do with the site. A retry separates that from a real defect: a genuine
   * failure fails twice, and a flake is reported as flaky rather than hidden.
   */
  retries: 1,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "laptop", use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 768 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  /**
   * Tests run against a production build, not `next dev`. In dev, the first
   * request to each route triggers an on-demand compile that can take longer
   * than a click assertion's timeout, which produces failures that say
   * nothing about the site.
   */
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
