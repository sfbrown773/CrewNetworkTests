import {
    contactInfoFixtures,
    expect
} from '../fixtures/myAccount.contactInfo.fixtures';
import {
    test
} from '@playwright/test'
import {
    aboutMeFixtures
} from '../fixtures/myAccount.aboutMe.fixtures';
import {
    createAccountFixtures
} from '../fixtures/createAccount.fixture';
import { AxeBuilder } from '@axe-core/playwright';
import { prettyPrintAxeReport } from 'axe-result-pretty-print';


test.use({
    storageState: './authState.json'
});


createAccountFixtures('should not have any automatically detectable accessibility issues', async ({ 
    page,
    homePage
    }) => {
    await homePage.open();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    //expect(accessibilityScanResults.violations).toEqual([]);
    prettyPrintAxeReport({
        violations: accessibilityScanResults.violations
    });
});

createAccountFixtures.only('accesibility - alt text', async ({
    page
}) => {
    const images = page.locator('img');
    const imgCount = await images.count();

    for (let i=0; i<imgCount; i++ ) {
        const image = images.nth(i);
        expect(image).toHaveAttribute('alt');
    }
    //get it to return a message for any that don't match
});

