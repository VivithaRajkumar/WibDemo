import { By, until } from "selenium-webdriver";
import fs from "fs";

export default class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "https://demo.nopcommerce.com/login";
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(until.titleContains("Login"), 10000);
  }

  async loginWithSavedCredentials() {
    const userData = JSON.parse(fs.readFileSync("./testData/userData.json", "utf-8"));
    const driver = this.driver;

    const emailField = await driver.findElement(By.id("Email"));
    const passwordField = await driver.findElement(By.id("Password"));
    const loginButton = await driver.findElement(By.css("button.login-button"));

    await emailField.clear();
    await emailField.sendKeys(userData.email);
    await passwordField.clear();
    await passwordField.sendKeys(userData.password);
    await loginButton.click();
    await driver.wait(until.elementLocated(By.linkText("My account")), 10000);
  }

  async isLoggedIn() {
    const driver = this.driver;
    const myAccountLink = await driver.findElement(By.linkText("My account"));
    return await myAccountLink.isDisplayed();
  }
}
