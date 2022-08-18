import { chromium } from 'playwright';
require('dotenv').config();
const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

export async function markTestStatus( status, vPage ){
  if (status = true) {
    await vPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'Test Passed'}})}`);
  }
  else if (status = null || false) {
   await  vPage.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Test Failed'}})}`);

  }
}

export async function instantiateBrowserstack( capabilities, testName ){
  capabilities['client.playwrightVersion'] = clientPlaywrightVersion;
  console.log(process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_ACCESS_KEY, clientPlaywrightVersion)
  capabilities['browserstack.username'] = process.env.BROWSERSTACK_USERNAME;
  capabilities['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY;
  capabilities['name'] = testName;
  
  console.log("Starting test -->", capabilities['name']);
  console.log(`wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(capabilities))}`)
  
  return await chromium.connect({
    wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${(encodeURIComponent(JSON.stringify(capabilities)))}`
  });
};