import {browser, ElementFinder, ExpectedConditions} from 'protractor';

export async function waitForVisibilityOf(el: ElementFinder) {
    await browser.wait(ExpectedConditions.visibilityOf(el), 30000);
}

export async function waitForElement(el: ElementFinder) {
    await browser.wait(ExpectedConditions.presenceOf(el), 30000);
}

export async function waitToBeClickable(el: ElementFinder) {
    await browser.wait(ExpectedConditions.elementToBeClickable(el), 30000);
}

export async function waitForInvisibilityOf(el: ElementFinder) {
    await browser.wait(ExpectedConditions.invisibilityOf(el), 30000);
}

export function sleep(seconds) {
    let e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {
    }
}