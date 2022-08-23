import { Locator, Page } from '@playwright/test';

export class ApplicationConsolidationOptimizationPage {
  readonly page: Page;
  readonly letsConnectButton: Locator;
  readonly url: string

  constructor(page: Page) {
    this.page = page;
    this.letsConnectButton = page.locator('#main >> text=Let’s connect');
    this.url='/solutions/application-consolidation-optimization/';
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickLetsConnect() {
    await this.letsConnectButton.click();
  }
}