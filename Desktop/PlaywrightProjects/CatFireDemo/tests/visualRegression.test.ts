import {
    aboutMeFixtures,
    expect
} from '../fixtures/myAccount.aboutMe.fixtures';
import { loginFixtures } from '../fixtures/login.fixtures';
import {
    test
} from '@playwright/test'

test.use({
    storageState: './authState.json'
});

loginFixtures('find gototop button', async ({
  homePage,
  page
}) => {
  await homePage.open();
  expect(page.getByRole('button').locator('.BackToTop_button__FEwuU')).toBeVisible();
});

loginFixtures.only('screenshots homepage', async ({
  homePage,
  loginPage,
  page
}) => {
  await homePage.open();
  await page.waitForLoadState('networkidle');
  await page.setViewportSize({ width: 1280, height: 628 });

  // Disable CSS animations for consistent screenshots
  await page.addStyleTag({
      content: `
        * {
          animation: none !important;
          transition: none !important;
        }
      `,
  });

  for (const section of await page.locator('section').all()) {
      // Scroll to the section before taking the screenshot
      const box = await section.boundingBox();
      if (box) {
          await page.evaluate((y) => window.scrollTo(0, y), box.y);
          await page.waitForTimeout(500); // Ensure stability after scrolling
      }

      // Take the screenshot with masking
      await expect(section).toHaveScreenshot({
          mask: [
              page.locator('[class="UpcomingEvent_event__gdoE_ hide-external-icon"]'),
              page.locator('article'),
              page.locator('time'),
              page.getByText('Feb4'),
              page.getByText('Multi-Day Event2025 CREW'),
              page.getByRole('button').locator('.BackToTop_button__FEwuU'),
          ],
          threshold: 0.1, // Adjust threshold as needed
      });
  }
});

/*loginFixtures.only('screenshots homepage', async ({
    homePage,
    loginPage,
    page
}) => {
    await homePage.open();
    await page.waitForLoadState('networkidle');
    //If problems continue, wait for a specific locator.
    await page.setViewportSize({ width: 1280, height: 628 });
    //Disabling CSS animations and transitions can help create more consistent screenshots
    await page.addStyleTag({
        content: `
          * {
            animation: none !important;
            transition: none !important;
          }
        `,
      });
      //Other suggestions: Use network throttling to ensure that network responses are consistent:
      //Intercept and mock network responses to replace dynamic data with static content if needed
    for (const section of await page.locator('section').all()) {
      await page.waitForSelector('header', { state: 'visible' });
      await page.waitForTimeout(1000);
      await expect(section).toHaveScreenshot({
        mask: [
          page.locator('[class="UpcomingEvent_event__gdoE_ hide-external-icon"]'),
          page.locator('article'),    // Replace with the class for news or announcements
          page.locator('time'),            // Selector for any date or timestamp elements
          page.getByText('Feb4'),
          page.getByText('Multi-Day Event2025 CREW'),  
          page.getByRole('button').locator('.BackToTop_button__FEwuU')  
        ],
        threshold: 0.1, // Adjust threshold as needed
          });
    }
});*/