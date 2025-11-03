import { By, until, Key } from "selenium-webdriver";

export default class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "https://demo.nopcommerce.com/onepagecheckout#opc-billing";
  }

  async open() {
    await this.driver.get(this.url);
  }

  // Fill billing address
  async fillBillingAddress({ firstName, lastName, email, country, city, address, zip, phone }) {
    await this.driver.wait(until.elementLocated(By.id("BillingNewAddress_FirstName")), 5000);
    await this.driver.findElement(By.id("BillingNewAddress_FirstName")).clear();
    await this.driver.findElement(By.id("BillingNewAddress_FirstName")).sendKeys(firstName);

    await this.driver.findElement(By.id("BillingNewAddress_LastName")).clear();
    await this.driver.findElement(By.id("BillingNewAddress_LastName")).sendKeys(lastName);

    await this.driver.findElement(By.id("BillingNewAddress_Email")).clear();
    await this.driver.findElement(By.id("BillingNewAddress_Email")).sendKeys(email);

    // Select country
    const countryDropdown = await this.driver.findElement(By.id("BillingNewAddress_CountryId"));
    await countryDropdown.sendKeys(country);

    await this.driver.findElement(By.id("BillingNewAddress_City")).sendKeys(city);
    await this.driver.findElement(By.id("BillingNewAddress_Address1")).sendKeys(address);
    await this.driver.findElement(By.id("BillingNewAddress_ZipPostalCode")).sendKeys(zip);
    await this.driver.findElement(By.id("BillingNewAddress_PhoneNumber")).sendKeys(phone);

    // Click Continue
    const continueBtn = await this.driver.findElement(By.css("#billing-buttons-container button"));
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", continueBtn);
    await this.driver.executeScript("arguments[0].click();", continueBtn);

    // Wait for next section to load
    await this.driver.sleep(1000);
  }

  async selectShippingMethod(methodName = "Ground") {
    const shippingOptions = await this.driver.findElements(By.name("shippingoption"));
    for (let option of shippingOptions) {
      const label = await option.getAttribute("id");
      if (label.includes(methodName.toLowerCase())) {
        await this.driver.executeScript("arguments[0].click();", option);
        break;
      }
    }
    const continueBtn = await this.driver.findElement(By.css("#shipping-method-buttons-container button"));
    await this.driver.executeScript("arguments[0].click();", continueBtn);
    await this.driver.sleep(1000);
  }

  async selectPaymentMethod(methodName = "Check / Money Order") {
    const paymentOptions = await this.driver.findElements(By.name("paymentmethod"));
    for (let option of paymentOptions) {
      const label = await option.getAttribute("id");
      if (label.toLowerCase().includes(methodName.toLowerCase().replace(/ /g, ""))) {
        await this.driver.executeScript("arguments[0].click();", option);
        break;
      }
    }
    const continueBtn = await this.driver.findElement(By.css("#payment-method-buttons-container button"));
    await this.driver.executeScript("arguments[0].click();", continueBtn);
    await this.driver.sleep(1000);
  }

  async confirmOrder() {
    const confirmBtn = await this.driver.findElement(By.css("#confirm-order-buttons-container button"));
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", confirmBtn);
    await this.driver.executeScript("arguments[0].click();", confirmBtn);
 
    // Wait for order confirmation message
    const orderSuccess = await this.driver.wait(
      until.elementLocated(By.css(".section.order-completed .title")),
      10000
    );
    return await orderSuccess.getText();
  }
}
