import {JUnitXmlReporter} from 'jasmine-reporters';

export function configureSpecReporter() {
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    jasmine.getEnv().addReporter(new SpecReporter(
        {
            spec: {displayStacktrace: false, displayDuration: true}
        }));
}

export function configureJUnitXmlReporter(browserName) {
    // you could use other properties here if you want, such as platform and version
    // var browserName = globalConf.capabilities.browserName;

    var junitReporter = new JUnitXmlReporter({
        consolidateAll: true,
        savePath: 'results',
        // this will produce distinct xml files for each capability
        filePrefix: browserName + '-xmloutput',
        modifySuiteName: function (generatedSuiteName, suite) {
            // this will produce distinct suite names for each capability,
            // e.g. 'firefox.login tests' and 'chrome.login tests'
            return browserName + '.' + generatedSuiteName;
        }
    });

    jasmine.getEnv().addReporter(junitReporter);
}

export function configureJasmine2HtmlReporter() {
    let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

    let today = new Date();
    let timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '_' + today.getHours() + 'h-' + today.getMinutes() + 'm';

    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: 'results/html',
        screenshotsFolder: 'failed-screenshots',
        showSummary: true,
        reportTitle: 'Protractor Reporter',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        filePrefix: 'report-' + timeStamp,
        preserveDirectory: false,
        consolidate: true,
        consolidateAll: true
    }));
}
