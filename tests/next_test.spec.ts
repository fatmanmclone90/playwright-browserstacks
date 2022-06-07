import { chromium, Browser, Page } from 'playwright';
import { test, expect } from '@playwright/test';
import { HEADER } from '../pom/header'
import { grabAllDomainCombos } from '../utils/combination'
import { injectAxe, checkA11y } from 'axe-playwright';
import {domains}  from '../fixtures/combos';


test.describe('Testing search bar', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.next.co.uk/');
  });
  
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
        await expect(page).toHaveScreenshot('Testing-search-bar-search-for-t-shirt-1-chromium-darwin.png', {threshold:0.2});
        await page.locator(HEADER.SEARCH_INPUT).fill('t-shirt');
        await page.locator(HEADER.SEARCH_INPUT).press('Enter');
        await expect(page.locator(HEADER.RESULT_HEADER)).toContainText('t-shirt');
       })
      });

      test.describe('accessibility test', ()=> {
        let browser: Browser
        let page: Page
        test.beforeAll(async ()=>{
          browser = await chromium.launch();
          page = await browser.newPage();
          await page.goto('https://www.next.co.uk/');

          await injectAxe(page) // inject axe-core on page
        })

        test('check page', async ()=>{
          await checkA11y(page); // execute axe at this point
        })
      })