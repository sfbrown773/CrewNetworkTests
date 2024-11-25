import {
  loginFixtures,
  expect
} from '../fixtures/login.fixtures';
import {
  test
} from '@playwright/test';

test.use({
  storageState: './notAuthState.json'
});

loginFixtures('go to log in, all visible', async ({
  homePage,
  loginPage,
  page
}) => {
  await homePage.open();
  await homePage.clickLoginButton();

  await expect(loginPage.userName).toBeVisible();
});

loginFixtures('submit blank login', async ({
  loginPage,
  page
}) => {
  await loginPage.clickContinueButton();
  await expect(loginPage.validationError).toBeVisible();
  await expect(loginPage.validationError).toHaveText('You must provide a username.');
});

loginFixtures('submit wrong email address', async ({
  loginPage,
  page
}) => {
  await loginPage.setUsernameFilled('douglas.brown@catalystfire.com')
  await loginPage.clickContinueButton();
  await expect(loginPage.validationError).toBeVisible();
  await expect(loginPage.validationError).toHaveText('We cannot find an account with that email address.');
});

loginFixtures.describe('tests with correct username', () => {

  loginFixtures.beforeEach('enter username, continue', async ({
      loginPage,
      page
  }) => {
      await loginPage.setUsernameFilled('doug.brown@catalystfire.com')
      await loginPage.clickContinueButton();
      await expect(loginPage.password).toBeVisible();
  });

  loginFixtures('login, no password', async ({
      loginPage,
      page
  }) => {
      await loginPage.clickLoginButton();
      await expect(loginPage.passwordError).toBeVisible();
      await expect(loginPage.passwordError).toHaveText('The Password field is required.');
  });

  loginFixtures('login, wrong password', async ({
      loginPage,
      page
  }) => {
      await loginPage.setPasswordFilled('12345')
      await loginPage.clickLoginButton();
      await expect(loginPage.passwordError).toBeVisible();
      await expect(loginPage.passwordError).toHaveText('Password is invalid.');
  });

  loginFixtures('successful login with test account', async ({
      loginPage,
      page
  }) => {
      await loginPage.setPasswordFilled('Asdf1@#$')
      await loginPage.clickLoginButton();
      await expect(page.getByRole('button', { name: 'Doug' })).toBeVisible();
  });

  loginFixtures('reveal password', async ({
      loginPage,
      page
  }) => {
      await loginPage.setPasswordFilled('1234');
      await expect(loginPage.password).toHaveAttribute('type', 'password');
      await loginPage.clickRevealPassword();
      await expect(loginPage.password).toHaveAttribute('type', 'text');
  });
});