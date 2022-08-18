import { test } from '@playwright/test';
import { markTestStatus, instantiateBrowserstack } from '../utils/browserstack'
import { capabilities }  from '../fixtures/browserstack_capabilities';
let vPage;
let vBrowser;
let testStatus;

test.describe('Example', () => {
  
  test.beforeEach(async () => {
    vBrowser = await instantiateBrowserstack(capabilities, 'Example');
    vPage = await vBrowser.newPage();  
  });

    test('direct to multiple sites', async ({  }) => {
      await vPage.goto('https://www.ensono.com');
    })

  test.afterEach(async () => {
      await markTestStatus(testStatus, vPage);
      await vPage.close();
      await vBrowser.close();
    }); 
});  