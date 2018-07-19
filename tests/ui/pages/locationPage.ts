import {browser, by, element} from 'protractor';
import {BasePage} from "./basePage";
import * as waits from "../util/waits";

export class LocationPage extends BasePage {

    pageHeader = element(by.xpath('//react-component[@name="rmaReact.LocationProfileEntry"]//h1'));
    tabHeader = element(by.css('h2'));
    agentsTab = element.all(by.xpath('//span[contains(text(),"Agents")]')).first();
    firstAgentShortlistLink = element.all(by.xpath('//a[contains(@class,"rmaShortlistAgent")]')).first();
    shortlistBookmark = element(by.xpath('//span[contains(@class,"rmaHeaderShortlistCount__count")] '));
    viewShortlistLink = element(by.css('div.rmaHeaderShortlistCount__menu.ng-scope > div.ng-scope > a'));

    constructor() {
        super();
    }

    async getPageHeader() {
        await waits.waitForVisibilityOf(this.pageHeader);
        return await this.pageHeader.getText();
    }

    async getTabHeader() {
        await waits.waitForVisibilityOf(this.tabHeader);
        return await this.tabHeader.getText();
    }

    async clickAgentsTab() {
        await waits.waitForVisibilityOf(this.agentsTab);
        await this.agentsTab.click();
    }

    async shortlistFirstAgent() {
        await waits.waitForVisibilityOf(this.firstAgentShortlistLink);
        await this.firstAgentShortlistLink.click();
    }

    async clickShortlistBookmark() {
        await waits.waitForVisibilityOf(this.shortlistBookmark);
        await this.shortlistBookmark.click();
    }

    async clickViewShortlistLink() {
        await waits.waitForVisibilityOf(this.viewShortlistLink);
        await this.viewShortlistLink.click();
    }

}