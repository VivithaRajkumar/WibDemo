import { By, until } from "selenium-webdriver";

export default class RegistrationPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "https://demo.nopcommerce.com/register?returnUrl=%2F";
  }

  async open() {
    await this.driver.get(this.url);
  }

  async fillRegistrationForm(firstName, lastName, email, password) {
    const driver = this.driver;
    await driver.findElement(By.id("gender-female")).click();
    await driver.findElement(By.id("FirstName")).sendKeys(firstName);
    await driver.findElement(By.id("LastName")).sendKeys(lastName);
    await driver.findElement(By.id("Email")).sendKeys(email);
    await driver.findElement(By.id("Password")).sendKeys(password);
    await driver.findElement(By.id("ConfirmPassword")).sendKeys(password);
  }

  async submit() {
    await this.driver.findElement(By.id("register-button")).click();
  }

  async getSuccessMessage() {
    const driver = this.driver;
    const messageLocator = By.css(".result");
    await driver.wait(until.elementLocated(messageLocator), 10000);
    return await driver.findElement(messageLocator).getText();
  }
}
