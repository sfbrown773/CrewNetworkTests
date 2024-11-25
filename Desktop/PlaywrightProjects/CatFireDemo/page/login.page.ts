import {
    AppPage
} from "./page.holder";

export class LoginPage extends AppPage {
    public pagePath = '/account/checkusername'
    public userName = this.page.getByPlaceholder('Enter your Email');
        private continueButton = this.page.getByRole('button', { name: 'Continue' });
        public validationError = this.page.locator('#loginForm li');
    public password = this.page.getByPlaceholder('Enter your Password');
        public login = this.page.getByRole('button', { name: 'Log in' });
        public passwordError = this.page.locator('div.validation-summary-errors li');
    public createAccount = this.page.getByRole('link', { name: 'Create new account' });
    public passwordRevealToggle = this.page.locator('svg.eye.password-toggle');

    async visit() {
        await this.page.goto('https://sso.crewnetwork.org')
    }

    async clickCreateAccount() {
        await this.createAccount.click()
    }

    async clickContinueButton() {
        await this.continueButton.click()
    }

    async setUsernameFilled(email: string) {
        await this.userName.type(email);
    }

    async setPasswordFilled(password: string) {
        await this.password.type(password);
    }

    async clickLoginButton() {
        await this.login.click()
    }

    async clickRevealPassword() {
        await this.passwordRevealToggle.click();
    }

}