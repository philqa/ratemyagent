import {browser, by, element} from 'protractor';
import {BasePage} from "./basePage";
import * as waits from "../util/waits";

export class ShortlistPage extends BasePage {

    RELATIVE_PAGE_URL = '/account/shortlist';
    pageHeader = element(by.css('h1[class="normalHeading"]'));
    firstShortlistedAgentRemoveLink = element(by.xpath('//button[contains(text(),"Remove")]'));
    firstShortlistedAgent = element(by.xpath('rma-user-shortlisted-agent'));

    constructor() {
        super();
    }

    async goToPage() {
        await this.navigateTo(this.RELATIVE_PAGE_URL);
    }

    async getUrl() {
        return await browser.params.customConfig.baseUrl + this.RELATIVE_PAGE_URL
    }

    async getPageHeader() {
        await waits.waitForVisibilityOf(this.pageHeader);
        return await this.pageHeader.getText();
    }

    async clickFirstShortlistedAgentRemoveLink() {
        await waits.waitForVisibilityOf(this.firstShortlistedAgentRemoveLink);
        await this.firstShortlistedAgentRemoveLink.click();
    }

}