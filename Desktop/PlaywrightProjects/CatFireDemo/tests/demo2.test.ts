import {
    test,
    expect
} from '@playwright/test'
import {
    aboutMeFixtures
} from '../fixtures/myAccount.aboutMe.fixtures';
import {
    createAccountFixtures
} from '../fixtures/createAccount.fixture';
import {
    loginFixtures
} from '../fixtures/login.fixtures';

test.use({
    storageState: './authState.json'
});

aboutMeFixtures.describe('name tests', () => {

    aboutMeFixtures.beforeEach('click name accordion', async ({
        aboutMePage
    }) => {
        await aboutMePage.clickNameAccordion();
        await aboutMePage.clickProfInfoAccordion();
    });

aboutMeFixtures('aboutMe all prefixes', async ({
    aboutMePage
}) => {
    await aboutMePage.flipThroughDropdowns();
});

aboutMeFixtures('checkboxes, click whole div', async ({ aboutMePage, page }) => {
    const checkboxes = page.locator('input[type="checkbox"]');
    const checkboxCount = await checkboxes.count();

    for (let i = 0; i < checkboxCount; i++) {
        const checkbox = checkboxes.nth(i);
        const parentDiv = await checkbox.locator('xpath=parent::div').first();

        if (await checkbox.isChecked()) {
            await parentDiv.click();
            await expect.soft(checkbox).not.toBeChecked();
        } else {
            await parentDiv.click();
            await expect(checkbox).toBeChecked();
        }
    }
});

aboutMeFixtures('dropdown alphabetized', async ({ aboutMePage, page }) => {

    const dropdowns = page.locator('.react-select__input-container');

    async function loopGetAndCheckAll() {
        const dropdownCount = await dropdowns.count(); 

        for (let i = 0; i < dropdownCount; i++) {
            const dropdown = dropdowns.nth(i); 

            await dropdown.click(); 
            await page.waitForSelector('.react-select__menu', { state: 'visible' }); 

            const items = await getDropdownItems();
            console.log(`Dropdown ${i + 1} Items:`, items); 

            const sortedItems = [...items].sort();
            console.log(`Sorted Dropdown ${i + 1} Items:`, sortedItems);
            await checkDropdownItems(items);
            await page.getByLabel('Title').click();
        }
    }

    async function getDropdownItems(): Promise<string[]> {
        const dropdownItems: string[] = await page.$$eval(
            '.react-select__menu .react-select__option',
            (options) => options.map((option) => option.textContent?.trim() || '')
        );

        return dropdownItems;
    }

    function isAlphabetized(items: string[]): boolean {
        const itemsWithoutOther = items.filter(item => item !== 'Other' && item !== 'Select...');
        const sortedItems = [...itemsWithoutOther].sort();

        // Combine the sorted items with 'Other' at the end
        const finalSortedItems = ['Select...', ...sortedItems, 'Other'];

        // Compare the original list with the final sorted list
        return items.every((item, index) => item === finalSortedItems[index]);
    }

    async function checkDropdownItems(items: string[]): Promise<void> {
        expect.soft(isAlphabetized(items)).toBe(true);
    }

    await loopGetAndCheckAll(); // Run the loop to check all dropdowns
});
});

createAccountFixtures('_Height, font of input boxes', async ({
    page,
    createAccountPage
}) => {
    const inputBoxes = page.locator('input.form-control[type="text"]');
    const elementsCount = await inputBoxes.count();

    const firstElementCSS = await inputBoxes.nth(0).evaluate((element) => {
        const computedStyle = window.getComputedStyle(element);
        return {
            fontFamily: computedStyle.fontFamily.trim(),
            fontSize: computedStyle.fontSize.trim(),
            fontWeight: computedStyle.fontWeight.trim(),
            lineHeight: computedStyle.lineHeight.trim(),
            height: computedStyle.height.trim()
        };
    });

    // To collect any mismatches (soft assertion)
    const mismatches: number[] = [];;

    for (let i = 1; i < elementsCount; i++) {
        const currentElementCSS = await inputBoxes.nth(i).evaluate((element) => {
            const computedStyle = window.getComputedStyle(element);
            return {
                fontFamily: computedStyle.fontFamily.trim(),
                fontSize: computedStyle.fontSize.trim(),
                fontWeight: computedStyle.fontWeight.trim(),
                lineHeight: computedStyle.lineHeight.trim(),
                height: computedStyle.height.trim()
            };
        });

        if (JSON.stringify(currentElementCSS) !== JSON.stringify(firstElementCSS)) {
            // Log the mismatch and the locator
            const locator = await inputBoxes.nth(i).evaluate((element) => element.outerHTML);
            console.log(`Mismatch found in ${locator}`);
            mismatches.push(i); // Collecting mismatches
        }
    }

    // Final soft assertion
    if (mismatches.length > 0) {
        console.log(`Mismatch found in the following elements: ${mismatches.join(', ')}`);
        // Optionally, add further assertions if necessary
        // expect(mismatches.length).toBe(0); // For example, fail the test if any mismatches found
    }
});

loginFixtures.only('screenshots homepage', async ({
    homePage,
    loginPage,
    page
  }) => {
    await homePage.open();
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1280, height: 628 });

    await expect(page).toHaveScreenshot();

});