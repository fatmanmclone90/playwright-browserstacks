import { test as base } from '@playwright/test';
import { instantiateBrowserstack } from '../utils/browserstack'
import { capabilities } from '../fixtures/browserstack_capabilities';

const isUndefined = val => (val === undefined || val === null || val === '');
const patchCaps = (name, title) => {
    let combination = name.split(/@browserstack/)[0];
    let [browerCaps, osCaps] = combination.split(/:/);
    let [browser, browser_version] = browerCaps.split(/@/);
    let osCapsSplit = osCaps.split(/ /);
    let os = osCapsSplit.shift();
    let os_version = osCapsSplit.join(' ');
    
    if (!isUndefined(browser)){
        capabilities.browser = browser;
    }

    if (!isUndefined(browser_version)){
        capabilities.browser_version = browser_version;
    }

    if (!isUndefined(os)){
        capabilities.os = os;
    }

    if (!isUndefined(os_version)){
        capabilities.os_version = os_version;
    }
    capabilities.name = title;
  };

const isHash = (entity) => Boolean(entity && typeof(entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
const evaluateSessionStatus = (status) => {
    if (!isUndefined(status)) {
      status = status.toLowerCase();
    }
    if (status === "passed") {
      return "passed";
    } else if (status === "failed" || status === "timedout") {
      return "failed";
    } else {
      return "";
    }
  }

export const test = base.extend({
    page: async ({}, use, testInfo) => {
        patchCaps(testInfo.project.name, `${testInfo.file} - ${testInfo.title}`);
        const browser = await instantiateBrowserstack(capabilities, `${testInfo.file} - ${testInfo.title}`);
        const page = await browser.newPage();
        await use(page);

        const testResult = {
            action: 'setSessionStatus',
            arguments: {
              status: evaluateSessionStatus(testInfo.status),
              reason: nestedKeyValue(testInfo, ['error', 'message'])
            },
          };
          await page.evaluate(() => {},
          `browserstack_executor: ${JSON.stringify(testResult)}`);
          await page.close();
          await browser.close();
    },
});

export default test;