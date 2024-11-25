import {
  HomePage
} from '../page/home.page';
import {
  LoginPage
} from '../page/login.page';
import {
  ChangePasswordPage
} from '../page/myAccount.changePassword.page';
import {
  MyAccountPage
} from '../page/myAccount.page';
import {
  expect,
  test as base
} from '@playwright/test';
// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage,
  loginPage: LoginPage,
  changePasswordPage: ChangePasswordPage
};
export const changePasswordFixtures = base.extend < MyFixtures > ({
  homePage: async ({
      page
  }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
  },
  changePasswordPage: async ({
      page
  }, use) => {
      const myAccountPage = new MyAccountPage(page);
      const changePasswordPage = new ChangePasswordPage(page);

      await changePasswordPage.open();
      await use(changePasswordPage);
  }
});
export {
  expect
}
from '@playwright/test';