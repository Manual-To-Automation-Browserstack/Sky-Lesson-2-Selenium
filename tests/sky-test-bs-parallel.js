const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');

async function runTestWithCaps (capabilities) {
  let driver = new webdriver.Builder().usingServer('https://' + process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY + '@hub-cloud.browserstack.com/wd/hub').withCapabilities(capabilities).build();
  try{
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
    //marking the test as Failed if product has not been added to the cart
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load"}}'
    );
    
    console.log(e);
  }
  await driver.quit();
}

// input capabilities
const capabilities = [
  {
    'os_version': '10',
    'browserName': 'Chrome',
    'browser_version': 'latest',
    'os': 'Windows',
    'build': 'BStack-[NodeJS] Sample Build 3',
    'name': 'Parallel test 1'
  },
  {
    'os_version': 'Monterey',
    'browserName': 'Chrome',
    'browser_version': 'latest',
    'os': 'OS X',
    'build': 'BStack-[NodeJS] Sample Build 3',
    'name': 'Parallel test 2'
  },
  {
    'os_version' : 'Big Sur',
    'browserName' : 'Safari',
    'os' : 'OS X',
    'build': 'BStack-[NodeJS] Sample Build 3',
    'name': 'Parallel test 3'
  },
  {
    'browserName': 'Android',
    'device': 'Samsung Galaxy S20',
    'realMobile': 'true',
    'build': 'BStack-[NodeJS] Sample Build 3',
    'name': 'Parallel test 4'
  },
  {
    'browserName': 'iPhone',
    'device': 'iPhone 12 Pro Max',
    'realMobile': 'true',
    'build': 'BStack-[NodeJS] Sample Build 3',
    'name': 'Parallel test 5'
  }
];

// The following code runs the test function as many times the capabilities are defined
capabilities.map(async (caps) => {
  await runTestWithCaps(caps);
  });