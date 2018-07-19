# Dev Test for RateMyAgent

## Requirements

```
Tasks:
- Analyse the business requirements
- Setup the following test frameworks:
- Frontend (UI): Using Javascript and Protractor
- Backend (API): Using Javascript and Mocha
- Develop automated tests focusing on functionality and include both positive and negative scenarios
- Document and submit any issues found
- Tests will be run in different environments and base urls so make sure they are configurable
- Tests should be executed through Command Line (CLI)
- Submit your project through Github or compressed file (ie. zip) and include a README file which contains instructions for setup and test executions (including on how to
execute on different environments and base urls)

Business Requirements:

RateMyAgent has developed a feature that allows consumers to shortlist real estate agents. Consumers need to login to be able to use the functionality.
Your task is to identify test scenarios, create an automation framework and develop automated test cases for both the frontend ​and backend​. Focus only on functional test cases and try to
include both positive and negative scenarios.

Below are user flows:
Sign up (do not automate this):
1. Navigate to ratemyagent.com.au
2. Click Login
3. In the popup window, click Sign up
4. Enter the required details and click the sign up button
5. Open the email and click Activate profile (You can now use this user in automating the rest of the tests)

Log-in:
1. Navigate to ratemyagent.com.au
2. Click Login
3. Enter the credentials you used during your sign up above

Add/Remove Shortlisted Agent:
1. Navigate to ratemyagent.com.au
2. Login using your credentials above
3. Using the search bar, search and open a location (ie. Victoria)
4. In the location profile page, click the Agents tab
5. Select a few agents and click the shortlist icon for each of them. You will notice that the
shortlisting count is increased each time.
6. Click the shortlisting icon on the top-right and click View Shortlist. You should see the
shortlisted agents in a list.
7. From the shortlisted agents list, select one agent and click the remove button. You
should see that the agent is removed from the shortlisting.
```

## Prerequisites

- Install Node 8.4.0+
- Install npm 5.6.0+
- Install Java 1.8+

## Setup
Environment configuration is maintained in `/tests/ui/config/environment.ts`

To add config for a new environment please follow the below steps
* Modify the configration on environment.ts
* Add the configuration to new env name e.g.
```
const ENV_CONFIG = {
  newenv: {
    // All the env specific configurations
  }
}
```
* Modify `package.json` to add the npm run script command for the test env
```
 test:newenv: "npm run compile && protractor protractor.conf.js --params.environment=newenv"
```

## Running

### UI Tests (Protractor & Jasmine)

After cloning the repo, run the following from the root project dir:

```
npm install
npm run webdriver-update
npm test
```

By default the production environment is used (it's the only one I had access to). Other environment can be used via the
relevant npm run scripts e.g.
```
npm run test:testusa
```

Please note that a local selenium instance isn't required for the Protractor UI tests as the directConnect property
is utilized to connect to Chrome. This is intended to speed up the tests, however if you experience issues try
disabling/removing this property in protractor.conf.js and running a local selenium server instance via:
```
webdriver-manager start
```

### API Tests (Mocha, Chai, Request)

To run the API tests run the following command from the CLI (assuming prerequisites and npm install have been followed):
```
npm run test:api
```

## Troubleshooting

### Problem: If you receive "Driver not on path" exception
Solution: update your local webdrivers via:
```
webdriver-manager update
```

### Problem: Selenium server/webdriver start seems to fail throwing an exit code 100
Solution: most likely you haven't updated your Java version to 1.8, you can confirm this by running webdriver-manager start

## Developer Remarks (TL;DR)

It should be noted that I time-boxed this activity and the majority of my time was spent on the UI testing framework. In all honesty I actually prefer API testing, but I've established a basic approach using Mocha as requested.

### Extensions

If I was extend this exercise I'd likely do start with the following TODOs:
UI:
- Add a logger e.g. protractor-console
- Use a more sophiscated reporter such as allure
- Add cloud baesd UI testing support e.g. SauceLabs or BrowserStack
- Add more browsers in multiCapabilities to test more browsers e.g. firefox/IE
- Add a headless browser profile/run script
- Switch on screenshot on fail functionality
API (plenty to do here)
- Add some model classes
- Abstract out the configuration
- Create utility classes (common functions, request classes)
- Logging
BOTH:
- Data creation before test execution (currently I'm using my pre-existing account, this makes the tests flaky as they're dependent on the state of that account). I've included an example class in /ui/data & /model of a nice way to do this via an existing service called randomuser.me

### Notes

A few things I noticed whilst adding some tests:
- There's very few IDs added to html elements
- When browsing some of the pages, I noticed some old data ("active/current" listings that were from quite a few years back, guessing you aggregate these from elsewhere and it's a data quality issue their end)
- Successful /Account/Login response body.Data.Message "YOU DA LOGGED IN DAWG" made me chuckle