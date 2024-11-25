import {
    AppPage
} from "./page.holder";

export class HomePage extends AppPage {
    public pagePath = '/'
    public loginButton = this.page.getByRole('button', {
        name: 'Sign in'
    });
    public loggedInDropdownButton = this.page.getByRole('button', {
        name: 'Doug'
    });
    public goToMyAccount = this.page.getByRole('link', {
        name: 'My Account'
    });
    public logoutButton = this.page.getByText('Sign Out');

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async clickLoggedInDropdownButton() {
        await this.loggedInDropdownButton.click()
    }
    async clickGoToMyAccount() {
        await this.goToMyAccount.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click()
    }
}