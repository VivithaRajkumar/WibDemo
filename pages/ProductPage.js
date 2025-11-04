import { By, until } from "selenium-webdriver";

export default class ProductPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "https://demo.nopcommerce.com/";
    }

    async open() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(By.css("div.header-menu")), 10000);
    }

    async selectProduct(productName) {
        const productLink = By.linkText(productName);
        await this.driver.wait(until.elementLocated(productLink), 10000);
        await this.driver.findElement(productLink).click();
    }

    async addFirstProductToCart() {
        const addBtn = By.css('.product-item .product-box-add-to-cart-button');

        const btn = await this.driver.wait(until.elementLocated(addBtn), 10000);
        await this.driver.executeScript('arguments[0].scrollIntoView(true);', btn);
        await this.driver.wait(until.elementIsVisible(btn), 5000);
        await this.driver.wait(until.elementIsEnabled(btn), 5000);

        await btn.click();

        // Wait for success notification
        const success = By.css('.bar-notification.success');
        await this.driver.wait(until.elementLocated(success), 30000);
        await this.driver.wait(async () => {
            const el = await this.driver.findElement(success);
            return (await el.isDisplayed());
        }, 15000);
    }

    async addToCart() {
        const addButton = By.css("button#add-to-cart-button-4");

        await this.driver.wait(until.elementLocated(addButton), 10000);
        await this.driver.findElement(addButton).click();

        const cartNotif = By.css("p.content");
        await this.driver.wait(until.elementLocated(cartNotif), 10000);
    }

    async goToCart() {
        const cartLink = By.css("a.ico-cart");
        await this.driver.wait(until.elementLocated(cartLink), 50000);
        await this.driver.findElement(cartLink).click();
        await this.driver.wait(until.urlContains("cart"), 50000);
    }

}
