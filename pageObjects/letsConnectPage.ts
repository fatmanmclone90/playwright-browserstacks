import { Locator, Page } from '@playwright/test';

export class LetsConnectPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly url: string

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator('text=Submit');
    this.url='/company/lets-connect/';
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }
}