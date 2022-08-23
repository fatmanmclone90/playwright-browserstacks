import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly solutionsMenu: Locator;
  readonly applicationConsolidationOptimization: Locator;
  readonly url: string

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('img[alt="Ensono"] >> nth=1');
    this.solutionsMenu = page.locator('#menu-item-207 >> text=Solutions');
    this.applicationConsolidationOptimization = page.locator('#menu-item-214 >> text=Application Consolidation + Optimization');
    this.url='';
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async gotoApplicationConsolidationOptimization() {
    await this.solutionsMenu.hover();
    await this.applicationConsolidationOptimization.click();
  }
}