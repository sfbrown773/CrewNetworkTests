import {
    AppPage
} from "./page.holder";

export class ContactInfoPage extends AppPage {
    public pagePath = '/my-account?tab=contact'
//locators
    /*public addressesAccordion = this.page.locator('#formAccordion_addresses_title');
    public primaryAddress = this.page.locator('.form-repeater__display-component strong').filter({
        hasText: 'Primary address'
    });*/
    public addressesAccordion = this.page.getByRole('button', {
        name: 'Addresses',
        exact: true
    });
    public primaryAddress = this.page.getByText('Primary address', {
        exact: true
    });
    public newAddress = this.page.getByRole('button', {
        name: 'Add Addresses'
    });
    public newAddressInput = this.page.getByLabel('Addresses', {
        exact: true
    }).getByRole('group').locator('#line1') //locator('#line1.form-control')//.getByLabel('Address Line 1');
    public addressError = this.page.locator('#line1_error'); //toHaveText('Address Line 1 is required');
    public newCityInput = this.page.getByLabel('Addresses', {
        exact: true
    }).getByRole('group').locator('#city') //.getByLabel('City');
    public cityError = this.page.locator('#city_error'); //toHaveText('City is required.')
    public newCountryInput = this.page.getByLabel('Addresses', {
        exact: true
    }).getByRole('group').locator('#react-select-country-input');
    public newStateInput = this.page.getByLabel('Addresses', {
        exact: true
    }).getByRole('group').locator('#react-select-state-live-region');
    //
    //locator('div:nth-child(2) > .form-repeater__edit > .form-repeater__edit-component > #state > .react-select > .react-select__control > .react-select__value-container > .react-select__input-container');
    public newPostalCodeInput = this.page.getByLabel('Addresses', {
        exact: true
    }).getByRole('group').locator('#postalCode'); //locator('#postalCode.form-control')//.getByLabel('Postal Code');
    public postalCodeError = this.page.locator('div[id="postalCode_error"]'); //DOES NOT DISPLAY CORRECTLY, toHaveText('Postal Code is required.')
    public saveNewAddress = this.page.getByRole('button', {
        name: 'Save'
    }) //getByLabel('Addresses', { exact: true }).getByText('Save').first()//.locator('div[id=formAccordion_addresses_fields] button.btn-filled').getByText('Save');//.getByRole('button', { name: 'Save' })
    public successfulSave = this.page.getByText('Successfully Updated Addresses');
    public editAddress = this.page.getByRole('button', {
        name: 'Edit 2543 W. Carmen Ave.'
    });
    public deleteAddress = this.page.getByRole('button', {
        name: 'Remove 2543 W. Carmen Ave.'
    }).first(); //locator('button[title="Remove 2543 W. Carmen Ave."]');
    public confirmDelete = this.page.locator('div.modal-dialog button.btn-filled');
    public emailAddressesAccordion = this.page.getByRole('button', {
        name: 'Email Addresses',
        exact: true
    });
    public primaryEmail = this.page.locator('.form-repeater__display-component strong').filter({
        hasText: 'Primary email'
    });
    public phoneNumbersAccordion = this.page.getByRole('button', {
        name: 'Phone Numbers',
        exact: true
    });
    public primaryPhone = this.page.locator('.form-repeater__display-component strong').filter({
        hasText: 'Primary Phone Number'
    });
    public deleteButton = this.page.locator('button.remove').first()

//methods
    async clickAddressAccordion() {
        await this.addressesAccordion.click()
    };

    async clickNewAddress() {
        var box = (await this.newAddress.boundingBox()) !;
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
    };

    async setAddressFilled(name: string) {
        await this.newAddressInput.fill(name);
    }

    async setCityFilled(name: string) {
        await this.newCityInput.fill(name);
    }

    async setPostalCodeFilled(name: string) {
        await this.newPostalCodeInput.fill(name);
    }

    async setCountryFilled(name: string) {
        await this.newCountryInput.click();
        await this.page.getByRole('option', {
            name
        }).click();
    }
    /*async setStateFilled(name:string){
        var box = (await this.newStateInput.boundingBox())!;
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
        await this.newStateInput.type(name);
        await this.page.getByRole('option', { name }).click();
        //await this.page.getByRole('option', { name }).click();
    }*/

    async clickSaveNewAddress() {
        await this.saveNewAddress.click();
    }

    async clickDeleteAddress() {
        await this.deleteAddress.click();
    };
    async clickConfirmDelete() {
        await this.confirmDelete.click();
    }

    async clickEditAddress() {
        await this.editAddress.click();
    };

    async clickEmailAccordion() {
        await this.emailAddressesAccordion.click()
    };

    async clickPhoneAccordion() {
        await this.phoneNumbersAccordion.click()
    };

};