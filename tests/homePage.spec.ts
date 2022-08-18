import { test } from '../fixtures/testFixture';
import { expect } from '@playwright/test';
import { HomePage } from '../pageObjects/homePage';
import { markTestStatus } from '../utils/browserstack'
let testStatus;

test.describe('homepage', () => {

  // can we read the test name automatically?
  test.use({ testName: 'somebody' });
  test('navigate menu', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.logo).toHaveAttribute('alt', 'Ensono');
    await homePage.gotoApplicationConsolidationOptimization();

    await expect(page).toHaveURL(homePage.url);
    await page.screenshot({ path: '/screenshots/screenshot.png', fullPage: true });
  });

  // can this be moved to a fixture?  
  test.afterEach(async ({ page, browser }) => {
    await markTestStatus(testStatus, page);
    await page.close();
    await browser.close();
  });
});
