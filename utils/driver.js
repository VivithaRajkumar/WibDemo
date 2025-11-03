import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

let driver;

export const getDriver = async () => {
  if (!driver) {
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }
  return driver;
};

export const quitDriver = async () => {
  if (driver) {
    await driver.quit();
    driver = null;
  }
};
