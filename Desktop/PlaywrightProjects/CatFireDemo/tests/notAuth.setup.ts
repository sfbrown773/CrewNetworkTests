import {
  test as setup,
  expect
} from '@playwright/test';
import {
  HomePage
} from '../page/home.page';
import path from 'path';

const notAuthFile = path.join(__dirname, '../notAuthState.json');

setup.describe('nonauthenticated browser state', () => {

  let homePage: HomePage;

  setup.beforeEach(async ({
      page
  }) => {
      homePage = new HomePage(page);
  });

  setup('authenticate', async ({
      page
  }) => {
      await homePage.open()
      await page.context().storageState({
          path: notAuthFile
      });

  });
});