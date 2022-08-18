// hello.ts
import { test as base } from '@playwright/test';
import { markTestStatus, instantiateBrowserstack } from '../utils/browserstack'
import { capabilities }  from '../fixtures/browserstack_capabilities';
import {Browser, Page} from '@playwright/test'
// Extend base test with our fixtures.

type TestFixture = {
    testName: string;
  };

//   export const test = base.extend<TestFixtures>( {
//     testName : 'placeholder',
//     async context( { testName, browser, page, context}, use ) {
//         browser = await instantiateBrowserstack(capabilities, 'Example');
//         page = await browser.newPage();  
//       await use( page );
//     },
//   } );

  export const test = base.extend<TestFixture>({
    testName: 'placeholder',
    page: async ({ page, browser, testName }, use) => {
        browser = await instantiateBrowserstack(capabilities, testName);
        page = await browser.newPage();  
      await use(page);
    },
  });
// Now, this "test" can be used in multiple test files, and each of them will get the fixtures.
export default test;