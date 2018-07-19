import {browser, by, element} from 'protractor';
import {BasePage} from "./basePage";
import * as waits from "../util/waits";

export class AccountDashboardPage extends BasePage {

    logoutLink = element(by.xpath('//button[contains(text(),"Logout")]'));
    shortlistLink = element(by.css('a[href="/account/shortlist"]'));
    reviewsLink = element(by.css('a[href="/account/reviews"]'));
    settingsLink = element(by.css('a[href="/account"]'));

    constructor() {
        super();
    }
    async clickLogoutLink() {
        await waits.waitForVisibilityOf(this.logoutLink);
        await this.logoutLink.click();
    }

}