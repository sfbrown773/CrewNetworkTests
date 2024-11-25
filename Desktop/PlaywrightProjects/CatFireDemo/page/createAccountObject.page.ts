import {
    ILogin
} from "../fixtures/interface/createAccount.model";
import {
    AppPage
} from "./page.holder";

export class CreateAccountPage extends AppPage {
    public pagePath = '/my-account/create-account'
    public email = this.page.getByLabel('Email * required') //this.page.locator('input#email');
    public password = this.page.getByLabel('Password * required', {
        exact: true
    }); //this.page.locator('input#password_eeff02ca-5906-41f5-a96a-e8adc206ea72');
    public passwordConfirm = this.page.getByLabel('Confirm password * required'); //page.locator('#confirm_password_eeff02ca-5906-41f5-a96a-e8adc206ea72');
    public firstName = this.page.getByLabel('First Name * required');
    public passwordError = this.page.locator('#password_eeff02ca-5906-41f5-a96a-e8adc206ea72_error');
    public confirmPasswordError = this.page.locator('#confirm_password_eeff02ca-5906-41f5-a96a-e8adc206ea72_error')
    public emailError = this.page.locator('div#email_error')
    public formErrors = this.page.locator('#createAccount_eeff02ca-5906-41f5-a96a-e8adc206ea72 div.form-errors')
    public emailSuccess = this.page.getByText('This email address was accepted');

    async createAccount(info:ILogin){
        
        this.setEmailFilled(info.email);
        this.setPasswordFilled(info.password);
        this.confirmPasswordFilled(info.confirmPassword);
        this.firstName.click();
    }

    async setEmailFilled(email: string) {
        await this.email.fill(email);
    }

    async setPasswordFilled(password: string) {
        await this.password.fill(password);
    }

    async confirmPasswordFilled(password: string) {
        await this.passwordConfirm.fill(password);
    }

    async clickOff() {
        await this.page.locator('input#middleName').click()
    }

}