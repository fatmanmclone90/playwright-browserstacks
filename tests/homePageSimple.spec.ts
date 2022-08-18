import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/homePage';
import { markTestStatus, instantiateBrowserstack } from '../utils/browserstack'
import { capabilities }  from '../fixtures/browserstack_capabilities';
let vPage;
let vBrowser;
let testStatus;

test.describe('homepage', () => {
  test.beforeEach(async () => {
    vBrowser = await instantiateBrowserstack(capabilities, 'Example');
    vPage = await vBrowser.newPage();  
  });

  test('navigate menu', async () => {
    const homePage = new HomePage(vPage);
    await homePage.goto();

    await expect(homePage.logo).toHaveAttribute('alt', 'Ensono');
    await homePage.gotoApplicationConsolidationOptimization();

    await expect(vPage).toHaveURL(homePage.url);
    await vPage.screenshot({ path: '/screenshots/screenshot.png', fullPage: true });
  });

  test.afterEach(async () => {
    await markTestStatus(testStatus, vPage);
    await vPage.close();
    await vBrowser.close();
  }); 
});
