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
        await this.driver.sleep(2000)
        try {
            // Attempt to fill the billing form
            const firstname = await this.driver.findElement(By.id("BillingNewAddress_FirstName"));
            await firstname.clear();
            await firstname.sendKeys(firstName);

            const lastname = await this.driver.findElement(By.id("BillingNewAddress_LastName"));
            await lastname.clear();
            await lastname.sendKeys(lastName);

            const emailField = await this.driver.findElement(By.id("BillingNewAddress_Email"));
            await emailField.clear();
            await emailField.sendKeys(email);

            const countryDropdown = await this.driver.findElement(By.id("BillingNewAddress_CountryId"));
            await countryDropdown.sendKeys(country);

            await this.driver.findElement(By.id("BillingNewAddress_City")).sendKeys(city);
            await this.driver.findElement(By.id("BillingNewAddress_Address1")).sendKeys(address);
            await this.driver.findElement(By.id("BillingNewAddress_ZipPostalCode")).sendKeys(zip);
            await this.driver.findElement(By.id("BillingNewAddress_PhoneNumber")).sendKeys(phone);

        } catch (err) {
            // If any element is not present or not visible, skip filling
            console.log("Billing form not present or cannot be filled, proceeding to Continue");
        } finally {
            // Always click Continue
            await this.driver.sleep(2000);
            const continueBtn = await this.driver.findElement(By.xpath("//button[text()='Continue']"));
            await continueBtn.click();
        }

        // // Click Continue
        // const continueBtn = await this.driver.findElement(By.css("#billing-buttons-container button"));
        // await this.driver.executeScript("arguments[0].scrollIntoView(true);", continueBtn);
        // await this.driver.executeScript("arguments[0].click();", continueBtn);

        // // Wait for next section to load
        // await this.driver.sleep(3000);
        // await this.driver.executeScript("arguments[0].click();", continueBtn);

        // const continueBtn = await this.driver.findElement(By.css('button.new-address-next-step-button[name="save"]'));
        // await continueBtn.click();
        await this.driver.sleep(3000);


    }
    async selectShippingMethod() {

        //     const driver = this.driver;
        //    try {
        //     await driver.wait(until.alertIsPresent(), 2000);
        //     const alert = await driver.switchTo().alert();
        //     console.log('Alert text:', await alert.getText());
        //     await alert.accept(); // or alert.dismiss() if needed
        // } catch (e) {
        //     // No alert present
        // }

        // Now click the continue button safely
        // const continueButton = await driver.findElement(
        //     By.css('button.payment-method-next-step-button[name="save"]')
        // );
        // await continueButton.click();
        await this.driver.sleep(5000);
        await this.driver.executeScript("ShippingMethod.save();");

        //     const continueBtn = await this.driver.findElement(By.xpath("//button[text()='Continue']"));
        // await continueBtn.click();
    }


    async selectPaymentMethod() {

        const paymentRadio = await this.driver.wait(
            until.elementLocated(By.id("paymentmethod_0")),
            5000
        );
        await paymentRadio.click();
        const btn = await this.driver.findElement(By.className("payment-method-next-step-button"));
        await this.driver.executeScript("arguments[0].click();", btn);
        await this.driver.sleep(2000);

    }

    async paymentInfo() {
        const btn = await this.driver.findElement(By.className("button-1 payment-info-next-step-button"));
        await this.driver.executeScript("arguments[0].click();", btn);
        await this.driver.sleep(2000);
    }

    async confirmOrder() {
        const confirmBtn = await this.driver.findElement(By.css("#confirm-order-buttons-container button"));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", confirmBtn);
        await this.driver.executeScript("arguments[0].click();", confirmBtn);
        await this.driver.sleep(5000);

        // Wait for order confirmation message
        const orderSuccess = await this.driver.wait(
            until.elementLocated(By.css(".section.order-completed .title")),
            20000
        );
        const text = await orderSuccess.getText();
        console.log("Order confirmation text:", text);

        if (!text.includes("Your order has been successfully processed!")) {
            throw new Error("Failed to complete order");
        }

    }
}
