import {
  HomePage
} from '../page/home.page';
import {
  LoginPage
} from '../page/login.page';
import {
  MyAccountPage
} from '../page/myAccount.page';
import {
  test as base
} from '@playwright/test';
// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage,
  loginPage: LoginPage,
  myAccountPage: MyAccountPage
};
export const myAccountFixtures = base.extend < MyFixtures > ({
  homePage: async ({
      page
  }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
  },
  myAccountPage: async ({
      page
  }, use) => {
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);
      const myAccountPage = new MyAccountPage(page);
      /*await homePage.open();
      await homePage.clickLoginButton();
      await loginPage.setUsernameFilled('doug.brown@catalystfire.com')
      await loginPage.clickContinueButton();
      await loginPage.setPasswordFilled('1234');
      await loginPage.clickContinueButton();*/
      await myAccountPage.open();
      await use(myAccountPage);
  }

});
export {
  expect
}
from '@playwright/test';