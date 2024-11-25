import {
  MyAccountPage
} from '../page/myAccount.page';
import {
  AboutMePage
} from '../page/myAccount.aboutMe.page';
import {
  test as base
} from '@playwright/test';

type MyFixtures = {
  myAccountPage: MyAccountPage,
  aboutMePage: AboutMePage
};
export const aboutMeFixtures = base.extend < MyFixtures > ({
  aboutMePage: async ({
      page
  }, use) => {
      const myAccountPage = new MyAccountPage(page);
      const aboutMePage = new AboutMePage(page);
      await myAccountPage.open();
      await myAccountPage.clickAboutMe();
      await use(aboutMePage);
  }
});
export {
  expect
}
from '@playwright/test';