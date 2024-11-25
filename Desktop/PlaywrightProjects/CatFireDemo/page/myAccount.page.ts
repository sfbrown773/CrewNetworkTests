import {
    AppPage
} from "./page.holder";

export class MyAccountPage extends AppPage {
    public pagePath = '/my-account'
//locators
    public heading = this.page.locator('#content h2.Account_headingTwo__61a1v');

    public aboutMeButton = this.page.getByRole('button', {
        name: 'About Me'
    });
    public nameAccordion = this.page.getByRole('button', {
        name: 'Name',
        exact: true
    });
    public changeNameForm = this.page.locator('#changeName_changeNameForm');
    public profInfoAccordion = this.page.getByRole('button', {
        name: 'Professional Information',
        exact: true
    });
    public changeOrgForm = this.page.locator('#changeName_changeNameForm');
    public contactInformationButton = this.page.getByRole('button', {
        name: 'Contact Information'
    });
    public addressesAccordion = this.page.getByRole('button', {
        name: 'Addresses',
        exact: true
    });
    public primaryAddress = this.page.getByText('Primary address', {
        exact: true
    });
    public emailAddressesAccordion = this.page.getByRole('button', {
        name: 'Email Addresses',
        exact: true
    });
    public primaryEmail = this.page.getByText('Primary email', {
        exact: true
    }).filter({
        hasText: 'Primary email'
    });
    public phoneNumbersAccordion = this.page.getByRole('button', {
        name: 'Phone Numbers',
        exact: true
    });
    public primaryPhone = this.page.getByText('Primary phone number', {
        exact: true
    });
    public changePasswordButton = this.page.getByRole('button', {
        name: 'Change Password'
    });
    public paidInvoicesButton = this.page.getByRole('button', {
        name: 'Paid Invoices'
    });
    public openInvoicesButton = this.page.getByRole('link', {
        name: 'Open Invoices'
    });
    public myEventsButton = this.page.getByRole('button', {
        name: 'My Events'
    });
    public MembershipsButton = this.page.getByRole('button', {
        name: 'Memberships'
    });
    public lifetimeGivingButton = this.page.getByRole('button', {
        name: 'Lifetime Giving'
    });

//methods
    async clickAboutMe() {
        await this.aboutMeButton.click()
    };
    async clickNameAccordion() {
        await this.nameAccordion.click()
    };
    async clickProfInfoAccordion() {
        await this.profInfoAccordion.click()
    }
    async clickContactInfo() {
        await this.contactInformationButton.click()
    };
    async clickAddressAccordion() {
        await this.addressesAccordion.click()
    };
    async clickEmailAccordion() {
        await this.emailAddressesAccordion.click()
    };
    async clickPhoneAccordion() {
        await this.phoneNumbersAccordion.click()
    };
    async clickChangePassword() {
        await this.changePasswordButton.click()
    };
    async clickPaidInvoices() {
        await this.paidInvoicesButton.click()
    };
    async clickOpenInvoices() {
        await this.openInvoicesButton.click()
    };
    async clickMyEvents() {
        await this.myEventsButton.click()
    };
    async clickMemberships() {
        await this.MembershipsButton.click()
    };
    async clickLifetimeGiving() {
        await this.lifetimeGivingButton.click()
    };
};