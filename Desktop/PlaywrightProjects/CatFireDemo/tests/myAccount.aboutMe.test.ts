import {
    aboutMeFixtures,
    expect
} from '../fixtures/myAccount.aboutMe.fixtures';
import {
    test
} from '@playwright/test'

test.use({
    storageState: './authState.json'
});

aboutMeFixtures.describe.configure({
    mode: "serial"
});

//DO A REQUEST NAME CHANGE TEST. IT WILL REQUIRE THAT POPUP SYNTAX

aboutMeFixtures.describe('name tests', () => {

    aboutMeFixtures.beforeEach('click name accordion', async ({
        aboutMePage
    }) => {
        await aboutMePage.clickNameAccordion();
    });


    aboutMeFixtures('aboutMe data entry', async ({
        aboutMePage
    }) => {
        await aboutMePage.enterData('Mr.','III','He/Him','test');
        await expect(aboutMePage.successfulSave).toBeVisible({timeout:30000});
    });

    aboutMeFixtures('aboutMe data check', async ({
        aboutMePage,
        page
    }) => {
        await aboutMePage.checkData('Mr.','III','He/Him','test');
    });
    aboutMeFixtures('aboutMe delete data', async ({
        aboutMePage,
        page
    }) => {
        await aboutMePage.enterData('Select...','Select...','Select...','');
    });
});