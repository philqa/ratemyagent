let conf = {
    specs: [
        'build/tests/ui/specs/login-spec.js',
        'build/tests/ui/specs/shortlist-spec.js'
    ],

    SELENIUM_PROMISE_MANAGER: false,

    multiCapabilities: [
        {
            browserName: 'chrome',
            directConnect: true,
            chromeOptions: {
                // 'headless' takes 2s longer on ci, so not used
                // ci also uses xvfb-run for a virtual display port
                args: [
                    // "headless", "window-size=1024, 768",
                    // "--disable-browser-side-navigation",
                    "allow-insecure-localhost",
                    "disable-gpu",
                    "no-sandbox",
                    "disable-web-security",
                    "verbose",
                    "log-path=chromedriver.log"
                ]
            },
            idleTimeout: 120,
            locationContextEnabled: true,
            javascriptEnabled: true,
            acceptSslCerts: true,
            trustAllSSLCertificates: true,
            acceptInsecureCerts: true,
            ignoreUncaughtExceptions: true,
            handlesAlerts: true,
            shardTestFiles: true,
            loggingPrefs: { browser: 'SEVERE', driver: 'ALL' }
        }
    ],
    framework: 'jasmine',
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    ScriptTimeoutError: 60000,
    jasmineNodeOpts: {
        onComplete: null,
        showColors: true,
        includeStackTrace: true,
        isVerbose: true,
        defaultTimeoutInterval: 120000
    },
    useAllAngular2AppRoots: true,
    onPrepare: async () => {
        let browser = require('protractor').browser;

        await browser.manage().deleteAllCookies();
        await browser.manage().window().setSize(1280, 1024);
        await browser.manage().timeouts().implicitlyWait(5000);
        await browser.manage().timeouts().pageLoadTimeout(60000);

        return browser.getProcessedConfig().then((config) => {
            let browserName = config.capabilities.browserName;
            console.log('browser.name: ' + browserName);
            // configure jasmine reporter
            let reporter = require('./build/tests/ui/util/reporter');
            reporter.configureSpecReporter();
            reporter.configureJUnitXmlReporter(browserName);
            reporter.configureJasmine2HtmlReporter();

            let environment = require('./build/tests/ui/config/environment');
            browser.params.customConfig = environment.getConfig(browser.params.environment);
        });
    }
};
exports.config = conf;