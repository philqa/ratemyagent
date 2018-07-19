import {browser, by, element} from 'protractor';

export class BasePage {

    /**
     * Navigates browser to a page using relative path from base URL
     * @param {string} relativeUrl path after base URL
     * @memberof BasePage
     */
    async navigateTo(relativeUrl: string) {
        return await browser.get(browser.params.customConfig.baseUrl + relativeUrl);
    }

}