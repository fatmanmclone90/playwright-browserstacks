const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];


const capabilities = {
  'browser': 'chrome', 
  'browser_version': 'latest',
  'os': 'Windows',
  'os_version': '11',
  'build': 'playwright-build-1',
  'client.playwrightVersion': clientPlaywrightVersion
};

module.exports = {capabilities}