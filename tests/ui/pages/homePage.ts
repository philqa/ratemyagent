import {browser, by, element, ElementFinder, ExpectedConditions} from 'protractor';
import {BasePage} from "./basePage";
import * as waits from "../util/waits";

export class HomePage extends BasePage {

    loginLink = element(by.cssContainingText('a', 'Log in'));
    emailInputField = element(by.css('input[type="email"]'));
    passwordInputField = element(by.css('input[type="password"]'));
    loginButton = element(by.linkText('Log In'));
    emailErrorMessage = element(by.css('div[ng-show="login.error.Email.messages"]'));
    passwordErrorMessage = element(by.css('div[ng-if="login.error.Password.messages"]'));
    loginErrorMessage = element(by.xpath('//div[@ng-show="login.error.message"]'));
    loginForm = element(by.css('form[name="loginForm"]'));
    userNav = element(by.css('nav[class="rmaUserNav"]'));
    userProfileButton = element(by.css('button[class="rmaUserNav_profile-button btn-unstyled"]'));
    searchBar = element(by.xpath('//div[@class="rmaHeader__searchBox"]'));
    searchField = element(by.id('searchBox'));
    firstSearchResult = element.all(by.css('div.rmaAutoSearchResult__details > div.ng-binding')).first();

    constructor() {
        super();
    }

    async goToPage() {
        return this.navigateTo('/');
    }

    async clickLoginLink() {
        await waits.waitForVisibilityOf(this.loginLink);
        await this.loginLink.click();
    }

    async enterEmailAddress(emailAddress: string) {
        await waits.waitForVisibilityOf(this.emailInputField);
        await this.emailInputField.sendKeys(emailAddress);
    }

    async enterPassword(password: string) {
        await waits.waitForVisibilityOf(this.passwordInputField);
        await this.passwordInputField.sendKeys(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isLoggedIn() {
        await waits.waitForVisibilityOf(this.userProfileButton);
        return await this.userProfileButton.isPresent();
    }

    async clickUserProfileButton() {
        await waits.waitForVisibilityOf(this.userProfileButton);
        await this.userProfileButton.click();
    }

    async getUserNav() {
        await waits.waitForVisibilityOf(this.userNav);
        return this.userNav;
    }

    /**
     * Utility method for logging in
     * @param {string} email - the user's email address necessary for log in
     * @param {string} password - the user's associated password
     * @returns {Promise<void>}
     */
    async loginWithCreds(email: string, password: string) {
        await this.clickLoginLink();
        await this.enterEmailAddress(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async login() {
        await this.loginWithCreds(browser.params.customConfig.data.email, browser.params.customConfig.data.password);
    }

    async getEmailErrorMessage() {
        await waits.waitForVisibilityOf(this.emailErrorMessage);
        return await this.emailErrorMessage.getText();
    }

    async getPasswordErrorMessage() {
        await waits.waitForVisibilityOf(this.passwordErrorMessage);
        return await this.passwordErrorMessage.getText();
    }

    async getLoginErrorMessage() {
        await waits.waitForVisibilityOf(this.loginErrorMessage);
        return await this.loginErrorMessage.getText();
    }

    async enterSearch(searchTerm: string) {
        await waits.waitForVisibilityOf(this.searchBar);
        await this.searchBar.click();
        await waits.waitForVisibilityOf(this.searchField);
        //browser.wait(ExpectedConditions.elementToBeClickable(this.searchField), 10000);
        await this.searchField.click();
        //browser.executeScript("arguments[0].click();", this.searchField);
        await this.searchField.sendKeys(searchTerm);
    }

    async clickFirstSearchResult() {
        await waits.waitForVisibilityOf(this.firstSearchResult);
        await this.firstSearchResult.click();
    }

}