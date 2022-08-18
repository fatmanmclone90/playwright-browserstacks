import { test as base } from '@playwright/test';
import { instantiateBrowserstack } from '../utils/browserstack'
import { capabilities } from '../fixtures/browserstack_capabilities';

type TestFixture = {
    testName: string;
};

export const test = base.extend<TestFixture>({
    testName: 'placeholder',
    page: async ({ page, browser, testName }, use) => {
        browser = await instantiateBrowserstack(capabilities, testName);
        page = await browser.newPage();
        await use(page);
    },
});

export default test;