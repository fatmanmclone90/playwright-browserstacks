import { test, expect, Page } from '@playwright/test';
import { HEADER } from '../pom/header'
import { grabAllDomainCombos } from '../utils/combination'
import {domains}  from '../fixtures/combos';
// import {test} from '../fixtures/fixture';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.next.co.uk/');
});

test.describe('Testing search bar', () => {

    test('direct to multiple sites', async ({ page }) => {
        const domainList = await grabAllDomainCombos(domains);
        // Create 1st todo.
       for (let i = 0; i < domainList.length;){
           console.log(domainList[i]);
           let url = `https://www.${domainList[i]}`
        await page.goto(url);
        await expect(page).toHaveURL(url);
        i++;
       }
      });

      test('search for t-shirt', async ({ page }) => {
        await page.goto('https://www.next.co.uk/');
        await page.locator(HEADER.SEARCH_INPUT).fill('t-shirt');
        await page.locator(HEADER.SEARCH_INPUT).press('Enter');
        await expect(page.locator(HEADER.RESULT_HEADER)).toContainText('t-shirt');
        // await expect(page).toHaveScreenshot();
       })
      });