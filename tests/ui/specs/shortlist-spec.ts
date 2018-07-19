import {$, browser, ExpectedConditions} from 'protractor';
import {HomePage} from "../pages/homePage";
import {LocationPage} from "../pages/locationPage";
import {ShortlistPage} from "../pages/shortlistPage";
import * as waits from "../util/waits";
import {until} from "selenium-webdriver";

describe('shortlist scenarios', () => {
    let homePage = new HomePage();
    let locationPage = new LocationPage();
    let shortlistPage = new ShortlistPage();

    beforeAll(async () => {
        console.log('running beforeAll');
        await homePage.goToPage();
        await browser.waitForAngularEnabled(false);
    });

    describe('search and add/remove agents to shortlist', () => {

        it('should authenticate the user if valid details are submitted', async () => {
            await homePage.login();
            expect(await homePage.isLoggedIn()).toBe(true);
        });
        it('should return results when a location/term is entered into the search bar', async () => {
            await homePage.enterSearch('spotswood');
            const firstSearchResult = await homePage.firstSearchResult.isPresent();
            expect(firstSearchResult).toBeTruthy();
        });
        it('should load the location page when clicking a location from the search results', async () => {
            await homePage.clickFirstSearchResult();
            const header = await locationPage.getPageHeader();
            expect(header).toContain('Spotswood');
        });
        it('should see agents displayed when the agents tab has been selected', async () => {
            await locationPage.clickAgentsTab();
            const pageTitle = await browser.getTitle();
            expect(pageTitle).toContain('Agents');
        });
        it('should see the shortlist bookmark when an agent is shortlisted', async () => {
            await locationPage.shortlistFirstAgent();
            const shortlistBookmarkIsVisible = await locationPage.shortlistBookmark.isPresent();
            const shortlistBookmarkText = await locationPage.shortlistBookmark.getText();
            expect(shortlistBookmarkIsVisible).toBeTruthy('shortlist bookmark not found');
            expect(shortlistBookmarkText).toEqual('1');
        });
        it('should see the shortlist page when the View Shortlist link', async () => {
            await locationPage.clickViewShortlistLink();
            const currentUrl = await browser.getCurrentUrl();
            const expectedUrl = await shortlistPage.getUrl();
            expect(currentUrl).toEqual(expectedUrl);
        });
        it('should see a shortlisted agent removed when clicking the Remove link', async () => {
            await shortlistPage.clickFirstShortlistedAgentRemoveLink();
            const shortlistedAgentIsVisible = await shortlistPage.firstShortlistedAgent.isPresent();
            expect(shortlistedAgentIsVisible).toBeFalsy('shortlisted agent still found');
        });
        it('should see the shortlist bookmark badge no longer displayed if all shortlisted agents are removed', async () => {
            //const shortlistBookmarkIsVisible = browser.isElementPresent(locationPage.shortlistBookmark);
            const shortlistBookmarkIsVisible = await locationPage.shortlistBookmark.isPresent();
            expect(shortlistBookmarkIsVisible).toBeFalsy('shortlist bookmark still found');
        });
        it('should see the shortlist page header updated when an agent is removed', async () => {
            const shortlistPageHeader = await shortlistPage.getPageHeader();
            expect(shortlistPageHeader).toEqual('No Shortlisted Agent');
        });
    });
});