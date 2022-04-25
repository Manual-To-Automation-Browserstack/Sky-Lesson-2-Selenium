// The WebDriver
const webdriver = require('selenium-webdriver');
// By is used to locate elements using different methods.
const { By } = require('selenium-webdriver');
// Assert is used to check that something meets the criteria.
const assert = require('assert');

// BrowserStack capabilities
const capabilities = {
  'os_version': '10', // Windows 10
  'browserName': 'Chrome',
  'browser_version': 'latest', // This will grab the latest version of the browser on BrowserStack.
  'os': 'Windows',
  'name': 'Sky Sample Test 1', // test / session name
  'build': 'Sky NodeJS Samples - Single' // CI/CD job or build name
 }

async function runTestOnBrowserStack () {
  let driver = new webdriver.Builder().usingServer('https://' + process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY + '@hub-cloud.browserstack.com/wd/hub').withCapabilities(capabilities).build();
  try {
    // Open the webpage
    await driver.get("https://sky.com/");
    driver.manage().window().maximize();

    // Swtich to the iFrame for the cookie consent dialog
    await driver.switchTo().frame(driver.findElement(By.id("sp_message_iframe_474555")));
    await driver.findElement(By.xpath("//button[@title='Agree']")).click();

    // Switch back to the main HTML body
    await driver.switchTo().defaultContent();

    // Find the search button on the page and click it.
    await driver.findElement(By.className("search-toggle__icon")).click();

    // Find the search box, type in a piece of text and click the search button.
    await driver.findElement(By.xpath("//input[@data-test-id='input-box']")).sendKeys("Bosch");
    await driver.findElement(By.xpath("//button[@data-test-id='submit-button']")).click();
  } catch(e) {
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load"}}'
    );
    console.log(e);
  }
  await driver.quit();
}

runTestOnBrowserStack();