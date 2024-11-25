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
import { Locator } from '@playwright/test';


test.use({
    storageState: './authState.json'
});

/*Potentially very useful. All elements that meet a condition get highlighted on the page.

elementsWithAfter.forEach(element => {
    element.style.outline = '2px solid red';
});*/



createAccountFixtures('labels and legends padding', async ({
    page,
    createAccountPage
}) => {
    const labelsAndLegends = page.locator('label, legend');
    
    const elementsCount = await labelsAndLegends.count();
    const firstElementCSS = await labelsAndLegends.nth(0).evaluate((element) => {
        // Get computed styles of the first element
        const computedStyle = window.getComputedStyle(element);
        return {
            style: computedStyle
            //padding: computedStyle.padding
        };
    });

    // Loop through all elements and check their computed CSS
    for (let i = 0; i < elementsCount; i++) {
        const currentElementCSS = await labelsAndLegends.nth(i).evaluate((element) => {
            const computedStyle = window.getComputedStyle(element);
            return {
                style: computedStyle
                //padding: computedStyle.padding
            };
        });

        try {
            // Soft assertion for the CSS comparison
            expect(currentElementCSS).toEqual(firstElementCSS);
        } catch (error) {
            // If the test fails, log the locator
            const locator = await labelsAndLegends.nth(i).evaluate((element) => element.outerHTML);
            console.log(`Mismatch found in element ${i}: ${locator}`);
        }
    }
});

createAccountFixtures('external links', async ({
    createAccountPage,
    page
}) => {
    const elementsWithAfter: Locator[] = []; // Store Locator objects

    const elements = await page.locator('*');
    const count = await elements.count();
    
    for (let i = 0; i < count; i++) {
        const element = elements.nth(i); // Get each element by index
        const afterStyle = await element.evaluate(el => {
            const computedStyle = window.getComputedStyle(el, '::after');
            return computedStyle.content;
        });
    
        if (afterStyle && afterStyle !== 'none') {
            elementsWithAfter.push(element); // Push the Locator directly
        }
    }
    
    console.log('Elements with ::after pseudo-elements:', elementsWithAfter);
    
}); 

createAccountFixtures('Height, font of input boxes', async ({
    page,
    createAccountPage
}) => {
    //is there a way to find a more generally applicable way of picking the right elements?
    const inputBoxes = page.locator('input')//.form-control:not([type=\'checkbox\'])

    const elementsCount = await inputBoxes.count();
    const firstElementCSS = await inputBoxes.nth(0).evaluate((element) => {
        // Get computed styles of the first element
        const computedStyle = window.getComputedStyle(element);
        return {
            fontFamily: computedStyle.fontFamily,
            fontSize: computedStyle.fontSize,
            fontWeight: computedStyle.fontWeight,
            lineHeight: computedStyle.lineHeight,
            height: computedStyle.height
        };
    });

    // Loop through all elements and check their computed CSS
    for (let i = 1; i < elementsCount; i++) {
        const currentElementCSS = await inputBoxes.nth(i).evaluate((element) => {
            const computedStyle = window.getComputedStyle(element);
            console.log(computedStyle.height, computedStyle.font);
            return {
                height: computedStyle.height,
                font: computedStyle.font
            };
        });
    }
});

contactInfoFixtures.describe('new tests on contact info', () => {
    contactInfoFixtures.beforeEach('visit form', async ({
        contactInfoPage
    }) => {
        await contactInfoPage.clickAddressAccordion();
    });
    //According to Andrii, the 'title' attribute being present is tantamount to there being a hover message visible.
    //Is this sufficient, even though it's not a user-facing attribute?
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

    //Once again, this is not a user facing element.
    contactInfoFixtures('for all buttons, cursor changes to pointer', async ({
        page
    }) => {
        for (const element of await page.locator('button:not([disabled])').all()) {
            await expect(element).toHaveCSS('cursor', 'pointer');
        }
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
aboutMeFixtures.describe('name tests', () => {

    aboutMeFixtures.beforeEach('click name accordion', async ({
        aboutMePage
    }) => {
        await aboutMePage.clickNameAccordion();
        await aboutMePage.clickProfInfoAccordion();
    });

    aboutMeFixtures.only('checkboxes, click whole div', async ({ aboutMePage, page }) => {
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
    
    
    aboutMeFixtures('aboutMe all prefixes', async ({
        aboutMePage
    }) => {
        await aboutMePage.setPrefix_all();
        await aboutMePage.setPrefix('Select...');
    });


    aboutMeFixtures('dropdown alphabetized', async ({
        aboutMePage,
        page
    }) => {

        async function getDropdownItems(): Promise < string[] > {

            await aboutMePage.pronouns.click();
            //await page.click('input[id="react-select-name.pronouns-input"]');
            
            await page.waitForSelector('.react-select__menu');

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

        // Function to check the dropdown items
        async function checkDropdownItems() {
            const items = await getDropdownItems();

            expect(items).toEqual(items.slice().sort()); // This checks if the list is alphabetized

            // If you want a more descriptive error, you can use this:
            expect(isAlphabetized(items)).toBe(true); // This will assert that the list is alphabetized
        }

        await checkDropdownItems();
    });
});

/*createAccountFixtures.only('external links with elementHandles', async ({
    createAccountPage,
    page
}) => {

    const elementsWithAfter: ElementHandle<HTMLElement | SVGElement>[] = []; // Explicitly type the array as ElementHandle

    const elements = await page.locator('*');
    const count = await elements.count(); // Get the count of matching elements

    for (let i = 0; i < count; i++) {
        const element = elements.nth(i); // Get each element by index
        const afterStyle = await element.evaluate(el => {
            const computedStyle = window.getComputedStyle(el, '::after');
            return computedStyle.content;
        });

        // Check if the `::after` pseudo-element has specific content
        //Has not successfully sorted for elements with this particular icon
        if (afterStyle === '""')
        //(afterStyle && afterStyle !== 'none') 
        {
            const elementHandle = await element.elementHandle();
            if (elementHandle) {
                elementsWithAfter.push(elementHandle); // Push the valid element handle
            }
        }
    }
    await page.pause()
    // Log the elements
    //console.log('Elements with ::after pseudo-elements:', elementsWithAfter);
    for (const element of elementsWithAfter) {
        const targetAttribute = await element.getAttribute('target'); // Get the 'target' attribute
        expect.soft(targetAttribute).toBe('_blank'); // Assert that it's '_blank'
        const outerHTML = await element.evaluate(el => el.outerHTML);
        console.log(outerHTML);
    }
}); */