import {
  test as setup,
  expect
} from '@playwright/test';
import {
  LoginPage
} from '../page/login.page';
import {
  HomePage
} from '../page/home.page';
import path from 'path';

const authFile = path.join(__dirname, '../authState.json');

setup.describe('authenticated browser state', () => {

  let homePage: HomePage;
  let loginPage: LoginPage;

  setup.beforeEach(async ({
      page
  }) => {
      homePage = new HomePage(page);
      loginPage = new LoginPage(page);
  });

  setup('authenticate', async ({
      page
  }) => {
      await homePage.open()
      await homePage.clickLoginButton()
      await loginPage.setUsernameFilled('doug.brown@catalystfire.com')
      await loginPage.clickContinueButton();
      await loginPage.setPasswordFilled('Asdf1@#$')
      await loginPage.clickLoginButton();
      await expect(homePage.loggedInDropdownButton).toBeVisible;


      await page.context().storageState({
          path: authFile
      });

  });
});