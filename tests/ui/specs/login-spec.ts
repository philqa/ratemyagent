import {browser} from 'protractor';
import {HomePage} from "../pages/homePage";
import {AccountDashboardPage} from "../pages/accountDashboardPage";

describe('login scenarios', () => {
    let homePage = new HomePage();
    let accountDashboardPage = new AccountDashboardPage();

    beforeAll(async () => {
        console.log('running beforeAll');
        await homePage.goToPage();
        await browser.waitForAngularEnabled(false);
    });

    describe('login with valid credentials (positive)', () => {

        afterAll(async () => {
            console.log('running afterAll');
            const logoutLinkIsVisible = await accountDashboardPage.logoutLink.isPresent();
            if (!logoutLinkIsVisible) {
                await homePage.clickUserProfileButton();
            }
            await accountDashboardPage.clickLogoutLink();
            //await browser.manage().deleteAllCookies();
        });

        it('should authenticate the user if valid details are submitted', async () => {
            await homePage.login();
            expect(await homePage.isLoggedIn()).toBe(true);
        });
        it('should display the username upon successful login', async () => {
            const username = await homePage.userProfileButton.getText();
            expect(username).toEqual(browser.params.customConfig.data.username, 'username did not match');
        });
        it('should not display the log in button once authenticated', async () => {
            const logInButtonIsVisible = await homePage.loginLink.isPresent();
            const userProfileButtonIsVisbile = await homePage.userProfileButton.isPresent();
            expect(logInButtonIsVisible).toBeFalsy('log in button was visible');
            expect(userProfileButtonIsVisbile).toBeTruthy('user profile button was not visible');
        });
        it('should allow the user to access the account dashboard and display relevant components', async () => {
            await homePage.clickUserProfileButton();
            const shortlistButtonIsVisible = await accountDashboardPage.shortlistLink.isPresent();
            const reviewsButtonIsVisible = await accountDashboardPage.reviewsLink.isPresent();
            const settingsButtonIsVisible = await accountDashboardPage.settingsLink.isPresent();
            expect(shortlistButtonIsVisible).toBeTruthy('shortlist button not visible');
            expect(reviewsButtonIsVisible).toBeTruthy('reviews button not visible');
            expect(settingsButtonIsVisible).toBeTruthy('settings button not visible');
        });
    });

    describe('incorrect login credentials (negative)', () => {

        beforeEach(async () => {
            await homePage.goToPage();
            await homePage.clickLoginLink();
        });

        it('should display an error message if the email is not provided', async () => {
            await homePage.enterPassword('xxxxxx');
            await homePage.clickLoginButton();
            const emailErrorMessage = await homePage.getEmailErrorMessage();
            const loginErrorMessage = await homePage.getLoginErrorMessage();
            expect(emailErrorMessage).toContain('The Email field is required.');
            expect(loginErrorMessage).toContain('The Email field is required.');
        });
        it('should display an error message if the password is not provided', async () => {
            await homePage.enterEmailAddress('xxx@y.z');
            await homePage.clickLoginButton();
            const passwordErrorMessage = await homePage.getPasswordErrorMessage();
            const loginErrorMessage = await homePage.getLoginErrorMessage();
            expect(passwordErrorMessage).toContain('The Password field is required.');
            expect(loginErrorMessage).toContain('The Password field is required.');
        });
        it('should display an error message if the email does not match email regexp/format', async () => {
            await homePage.enterEmailAddress('xxxxxx');
            await homePage.enterPassword('xxxxxx');
            await homePage.clickLoginButton();
            const emailErrorMessage = await homePage.getEmailErrorMessage();
            const loginErrorMessage = await homePage.getLoginErrorMessage();
            expect(emailErrorMessage).toContain('The Email field is required.');
            expect(loginErrorMessage).toContain('The Email field is required.');
        });
        it('should display an error message if the user credentials are invalid', async () => {
            await homePage.enterEmailAddress('xxx@y.z');
            await homePage.enterPassword('xxxxxx');
            await homePage.clickLoginButton();
            const loginErrorMessage = await homePage.getLoginErrorMessage();
            expect(loginErrorMessage).toContain('Sorry, we couldn’t sign you in. You may not have an account with us ' +
                'yet or the details your provided may be incorrect.');
        });
    });

});