import {
    AppPage
} from "./page.holder";
import {
    expect
} from '@playwright/test';

export class AboutMePage extends AppPage {
    public pagePath = '/my-account'
//locators
    public heading = this.page.locator('#content h2.Account_headingTwo__61a1v');
    public aboutMeButton = this.page.getByRole('button', {
        name: 'About Me'
    });
        public nameAccordion = this.page.getByRole('button', {
        name: 'Name'
    });
    public profInfoAccordion = this.page.getByRole('button', {
        name: 'Professional Information'
    });
            public prefixDropdown = this.page.locator('div.react-select__input-container.css-1q14td1').first(); //('#react-select-name.prefix-input');
            public changeNameForm = this.page.getByRole('button', {
                name: 'Request Change'
            });
            public suffixDropdown = this.page.locator('div[id="name.suffix"]');
            public preferredName = this.page.getByLabel('Preferred First Name');
            public pronouns = this.page.locator('div[id="name.pronouns"]');
            public checkboxHideMe = this.page.getByLabel('Hide me from all Event');
    public submitChangesButton = this.page.getByRole('button', {
        name: 'Submit'
    });
        public successfulSave = this.page.locator('div.Toast_toast__WqsCm.mb-5').filter({
        hasText: /^Your profile was successfully updated$/
    });
//methods
    async clickAboutMe() {
        await this.aboutMeButton.click()
    }
    async clickNameAccordion() {
        await this.nameAccordion.click()
    }
    async clickProfInfoAccordion() {
        await this.profInfoAccordion.click();
    }
    async enterData(
        prefix: string,
        suffix: string,
        pronouns: string,
        prefname: string
    ) {
        await this.setPrefix(prefix);
        await this.setSuffix(suffix);
        await this.setPronouns(pronouns);
        await this.setPrefNameFilled(prefname);
        await this.checkbox();
        await this.submitChanges();
    }
/*    async checkData(
        prefix: string,
        suffix: string,
        pronouns: string,
        prefname: string
    ) {
        const savedPrefix = await this.getPrefix();
        await expect(savedPrefix).toBe(prefix);
        const savedSuffix = await this.getSuffix();
        await expect(savedSuffix).toBe(suffix);
        const savedPronouns = await this.getPronouns();
        await expect(savedPronouns).toBe(pronouns);
        const savedPrefName = await this.getPrefName();
        await expect(savedPrefName).toBe(prefname);
        await expect(this.checkboxHideMe).toBeChecked();
    }
*/
    async checkData(
        prefix: string,
        suffix: string,
        pronouns: string,
        prefname: string
    ) {
        await expect(this.page.getByText(prefix)).toBeVisible();
        await expect(this.page.getByText(prefname)).toBeVisible();
        await expect(this.page.getByText(suffix)).toBeVisible();
        await expect(this.page.getByText(pronouns)).toBeVisible();
        await expect.soft(this.checkboxHideMe).toBeChecked();
    }
    async flipThroughDropdowns() {
        const dropdowns = this.page.locator('.react-select__input-container'); // Locator for all dropdowns
        const dropdownCount = await dropdowns.count(); // Get the total number of dropdowns
    
        for (let i = 0; i < dropdownCount; i++) {
            const dropdown = dropdowns.nth(i); // Get the nth dropdown as a Locator
            await dropdown.click(); // Open the dropdown
    
            // Scope options to the opened dropdown
            const options = this.page.locator('.react-select__menu'); // Locator for the dropdown menu
            const optionCount = await options.locator('[role="option"]').count(); // Get the count of options
    
            for (let j = 0; j < optionCount; j++) {
                const option = options.locator('[role="option"]').nth(j); // Get nth option in the current dropdown
                await option.click(); // Select the option
                await dropdown.click(); // Reopen the dropdown if necessary
            }
            await dropdown.click();
        }
    }
    
    async setPrefix_all() {
        await this.preferredName.fill('dd');
        await this.page.waitForTimeout(1000);
        await this.preferredName.fill('');
        await expect(this.submitChangesButton).not.toHaveAttribute('disabled');
        await this.prefixDropdown.click();
        for (const element of await this.page.getByRole('option').all()) {
            const optionText = await element.textContent();
            await element.click();
            await this.submitChangesButton.click();
            await expect(this.successfulSave).toBeVisible();
            const selectedValueAfterSave = await this.page.locator('[id="name\.prefix"] [class="react-select__single-value css-1hkwlv1-singleValue"]').textContent();
            expect(selectedValueAfterSave?.trim()).toBe(optionText?.trim());
            await this.prefixDropdown.click();
          }
        await this.preferredName.fill('')
    }
    async setPrefix(name: string) {
        await this.prefixDropdown.click();
        await this.page.getByRole('option', {
            name
        }).click();
    }
    async getPrefix(): Promise<string | null> {
        return await this.page.locator('input[id="react-select-name.prefix-input"]').textContent();
    }
    async setSuffix(name: string) {
        await this.suffixDropdown.click();
        await this.page.getByRole('option', {
            name
        }).click();
    }
    async getSuffix(): Promise<string | null> {
        return await this.suffixDropdown.textContent();
    }
    async setPrefNameFilled(name: string) {
        await this.preferredName.fill('');
        await this.preferredName.type(name);
    }
    async getPrefName(): Promise<string | null> {
        return await this.preferredName.textContent();
    }
    async setPronouns(name: string) {

        await this.pronouns.click();
        await this.page.getByRole('option', {
            name
        }).click();
    }
    async getPronouns(): Promise<string | null> {
        return await this.pronouns.textContent();
    }
    async checkbox() {
        if (await this.checkboxHideMe.isChecked()) {} else {
            await this.checkboxHideMe.check();
        }
    }
    async uncheck() {
        await this.checkboxHideMe.uncheck();
    }
    async submitChanges() {
        await this.submitChangesButton.click();
    }
}