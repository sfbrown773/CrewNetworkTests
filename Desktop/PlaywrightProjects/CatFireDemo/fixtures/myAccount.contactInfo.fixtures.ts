import {
  HomePage
} from '../page/home.page';
import {
  LoginPage
} from '../page/login.page';
import {
  ContactInfoPage
} from '../page/myAccount.contactInfo.page';
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
  contactInfoPage: ContactInfoPage
};
export const contactInfoFixtures = base.extend < MyFixtures > ({
  homePage: async ({
      page
  }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
  },
  contactInfoPage: async ({
      page
  }, use) => {
      const images = await page.getByRole('button').all();
      const myAccountPage = new MyAccountPage(page);
      const contactInfoPage = new ContactInfoPage(page);
      await myAccountPage.open();
      await myAccountPage.clickContactInfo();
      await use(contactInfoPage);
  }

});
export {
  expect
}
from '@playwright/test';