const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');

async function runTestWithCaps (capabilities) {
  let driver = new webdriver.Builder().forBrowser('chrome').build();
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
    console.log(e);
  }
  await driver.quit();
}

// input capabilities
const capabilities = [{}];

// The following code runs the test function as many times the capabilities are defined
capabilities.map(async (caps) => {
  await runTestWithCaps(caps);
  });