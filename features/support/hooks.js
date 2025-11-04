import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";

let sharedDriver;

BeforeAll(async function () {
  const options = new chrome.Options();
  options.addArguments("--start-maximized"); // visible browser
  // options.addArguments("--headless"); // optional

  sharedDriver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
});



Before(function () {
  this.driver = sharedDriver;
});

// Capture screenshot on failure
After(async function (scenario) {
  if (scenario.result.status === "FAILED") {
    try {
      const devTools = await this.driver.createCDPConnection('page');
      const { data } = await this.driver.sendAndGetDevToolsCommand(
        'Page.captureScreenshot',
        { captureBeyondViewport: true, fromSurface: true }
      );

      const screenshotPath = path.join("screenshots", `FAILED_${Date.now()}.png`);
      fs.mkdirSync("screenshots", { recursive: true });
      fs.writeFileSync(screenshotPath, data, "base64");
      console.log(` Full-page screenshot saved to: ${screenshotPath}`);

      // Log current URL for debugging
      const currentUrl = await this.driver.getCurrentUrl();
      console.log(` URL at failure: ${currentUrl}`);
    } catch (error) {
      console.error(" Failed to capture full-page screenshot:", error);
    }
  }
});

AfterAll(async function () {
  if (sharedDriver) {
    await sharedDriver.quit();
  }
});