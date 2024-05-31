const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { AxeBuilder } = require('@axe-core/webdriverjs');

const screen = {
  width: 640,
  height: 480
};

describe('demo', function () {
    this.timeout(30000); // Setting a higher timeout for browser interactions

    let driver;

    beforeEach(async () => {
        driver = new Builder()
            .forBrowser('chrome')            
            .setChromeOptions(new chrome.Options().addArguments('--headless').windowSize(screen))
            .build();
        await driver.get('https://dequeuniversity.com/demo/mars/');
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('test case 1 - main-nav is loaded', async function () {
        const element = await driver.wait(until.elementLocated(By.id('main-nav')), 10000);
        assert.strictEqual(await element.isDisplayed(), true, 'main-nav is not loaded');
    });

    it('test case 2 - check accesabiltiy', async function () {
        const results = await new AxeBuilder(driver).analyze();
        
        // asset incomplete
        assert.strictEqual(results.incomplete.length, 0, `${results.incomplete.length} incomplete accessability issues found`);
        // asset violations
        assert.strictEqual(results.violations.length, 0 `${results.violations.length} violations accessability issues found`);
    });
});
