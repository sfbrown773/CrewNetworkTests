import {
  HomePage
} from '../page/home.page';
import {
  LoginPage
} from '../page/login.page';
import {
  test as base
} from '@playwright/test';
// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage,
  loginPage: LoginPage,
};
export const loginFixtures = base.extend < MyFixtures > ({
  homePage: async ({
      page
  }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
  },
  loginPage: async ({
      page
  }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.visit();
      await use(loginPage);
  }
});
export {
  expect,
  test as setup
}
from '@playwright/test';