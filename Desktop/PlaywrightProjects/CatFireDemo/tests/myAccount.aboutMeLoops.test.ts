import {
    aboutMeFixtures,
    expect
} from '../fixtures/myAccount.aboutMe.fixtures';
import {
    contactInfoFixtures
} from '../fixtures/myAccount.contactInfo.fixtures';
import {
    test
} from '@playwright/test'

test.use({
    storageState: './authState.json'
});

aboutMeFixtures.describe('about me loops', () => {
    aboutMeFixtures.beforeEach('click name accordion', async ({
        aboutMePage
    }) => {
        await aboutMePage.clickNameAccordion();
    });

    aboutMeFixtures.skip('prefix loop', async ({
        aboutMePage
    }) => {
        await aboutMePage.flipThroughDropdowns();
    });

    aboutMeFixtures.skip('aboutMe all prefixes', async ({
        aboutMePage
    }) => {
        await aboutMePage.setPrefix_all();
    });

    aboutMeFixtures('for all buttons, cursor changes to pointer', async ({
        page
    }) => {
        for (const element of await page.locator('button:not([disabled])').all()) {
            await expect(element).toHaveCSS('cursor', 'pointer');
        }
    });

aboutMeFixtures('dropdown alphabetized', async ({ aboutMePage, page }) => {
    await page.getByRole('button', {name: 'Professional Information'}).click();

    const dropdowns = page.locator('.react-select__input-container'); // Locator for all dropdowns

    async function loopGetAndCheckAll() {
        const dropdownCount = await dropdowns.count(); // Get the total number of dropdowns

        for (let i = 0; i < dropdownCount; i++) {
            const dropdown = dropdowns.nth(i); // Get the nth dropdown as a Locator

            await dropdown.click(); // Open the specific dropdown
            await page.waitForSelector('.react-select__menu', { state: 'visible' }); // Ensure the dropdown is visible

            const items = await getDropdownItems(); // Get items for the currently open dropdown
            console.log(`Dropdown ${i + 1} Items:`, items); // Log the original dropdown items

            const sortedItems = [...items].sort(); // Sort the items alphabetically
            console.log(`Sorted Dropdown ${i + 1} Items:`, sortedItems); // Log the sorted dropdown items
            await checkDropdownItems(items); // Validate if the items are alphabetized
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
        const itemsWithoutOther = items.filter(item => item !== 'Other');
        const sortedItems = [...itemsWithoutOther].sort();

        // Combine the sorted items with 'Other' at the end
        const finalSortedItems = [...sortedItems, 'Other'];

        // Compare the original list with the final sorted list
        return items.every((item, index) => item === finalSortedItems[index]);
    }

    async function checkDropdownItems(items: string[]): Promise<void> {
        expect.soft(isAlphabetized(items)).toBe(true);
    }

    await loopGetAndCheckAll(); // Run the loop to check all dropdowns
});
});


contactInfoFixtures.describe('new tests on contact info', () => {
    contactInfoFixtures.beforeEach('visit form', async ({
        contactInfoPage

    }) => {
        await contactInfoPage.clickAddressAccordion();
    });

    contactInfoFixtures('hover message visible', async ({
        page
    }) => {
        for (const element of await page.locator('button.remove').all()) {
            await expect(element).toHaveAttribute('title');
        }
    });
    contactInfoFixtures('cannot delete primaries', async ({
        page
    }) => {
        const elements = page.locator('button.remove[disabled]')
        await expect(elements).toHaveCount(3);
    });

    //CURRENTLY, EXPECT TO FAIL. DISCUSS WHAT CONDITIONS TO APPLY WITH DAD

    contactInfoFixtures('all buttons have border', async ({
        page
    }) => {
        for (const button of await page.locator('button').all()) {

            const border = await button.evaluate((el) => {
                return window.getComputedStyle(el).getPropertyValue('border-top-width')
            });
            console.log(border);
            await expect.soft(border).not.toEqual('0px')
            //JUST AN EXAMPLE, BUT NEED HELP TO DETERMINE WHAT THE CONDITION IS FOR THE 'expect'  
        }
    });
});