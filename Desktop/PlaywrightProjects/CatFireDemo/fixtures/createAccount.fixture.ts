import {
  CreateAccountPage
} from '../page/createAccountObject.page';
import {
  CreateAccountPageStrings
} from '../page/createAccountStrings.page';
import {
  HomePage
} from '../page/home.page';
import {
  LoginPage
} from '../page/login.page';
import {
  test as base
} from '@playwright/test';

type MyFixtures = {
  createAccountPage: CreateAccountPage,
  createAccountPageStrings: CreateAccountPageStrings,
  homePage: HomePage,
  loginPage: LoginPage,
};
export const createAccountFixtures = base.extend < MyFixtures > ({
  createAccountPage: async ({
      page
  }, use) => {
      const createAccountPage = new CreateAccountPage(page)
      await createAccountPage.open()
      await use(createAccountPage)
  },
  createAccountPageStrings: async ({
    page
}, use) => {
    const createAccountPageStrings = new CreateAccountPageStrings(page)
    await createAccountPageStrings.open()
    await use(createAccountPageStrings)
},
  homePage: async ({
      page
  }, use) => {
      const homePage = new HomePage(page)
      await use(homePage)
  },
  loginPage: async ({
      page
  }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
  }
});
export {
  expect
}
from '@playwright/test';