import { test } from '../fixtures/testFixture';
import { expect } from '@playwright/test';
import { HomePage } from '../pageObjects/homePage';
import { ApplicationConsolidationOptimizationPage } from '../pageObjects/applicationConsolidationOptimizationPage';
import { LetsConnectPage } from '../pageObjects/letsConnectPage';

test.describe('homepage', () => {

  test('navigate menu', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.logo).toHaveAttribute('alt', 'Ensono');
    await homePage.gotoApplicationConsolidationOptimization();
    
    const applicationConsolidationOptimizationPage = new ApplicationConsolidationOptimizationPage(page);

    await expect(page).toHaveURL(applicationConsolidationOptimizationPage.url);

    await applicationConsolidationOptimizationPage.clickLetsConnect();
    await expect(applicationConsolidationOptimizationPage.letsConnectButton.isVisible()).toBeTruthy();

    await applicationConsolidationOptimizationPage.clickLetsConnect();

    const letsConnectPage = new LetsConnectPage(page);
    await expect(page).toHaveURL(letsConnectPage.url);
  });
});
