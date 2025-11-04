import { By, until } from 'selenium-webdriver';

export default class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://demo.nopcommerce.com/cart';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async getCartItems() {
    await this.driver.wait(until.elementsLocated(By.css('.cart-item-row')), 10000);
    return await this.driver.findElements(By.css('.cart-item-row'));
  }

  async getCartItemNames() {
    const items = await this.getCartItems();
    const names = [];
    for (let item of items) {
      const nameEl = await item.findElement(By.css('.product-name a'));
      names.push(await nameEl.getText());
    }
    return names;
  }

  async removeItemByName(productName) {
    const items = await this.getCartItems();
    for (let item of items) {
      const nameEl = await item.findElement(By.css('.product-name a'));
      const name = await nameEl.getText();
      if (name.includes(productName)) {
        const removeCheckbox = await item.findElement(By.css('input.remove-from-cart'));
        await removeCheckbox.click();
      }
    }
    const updateBtn = await this.driver.findElement(By.name('updatecart'));
    await updateBtn.click();
  }

  async getTotalPrice() {
    const totalEl = await this.driver.findElement(By.css('.cart-total-right'));
    return await totalEl.getText();
  }
  async getCartItemNames() {
    await this.driver.wait(until.elementsLocated(By.css('td.product a')), 10000);
    const items = await this.driver.findElements(By.css('td.product a'));
    const names = [];
    for (let item of items) {
      names.push(await item.getText());
    }
    return names;
  }

  async acceptTerms() {
    const termsCheckbox = await this.driver.wait(
      until.elementLocated({ id: 'termsofservice' }),
      10000
    );

    await this.driver.wait(until.elementIsVisible(termsCheckbox), 5000);

    const isChecked = await termsCheckbox.isSelected();
    if (!isChecked) {
      // Scroll into view and click using JS to avoid interception
      await this.driver.executeScript('arguments[0].scrollIntoView(true);', termsCheckbox);
      await this.driver.executeScript('arguments[0].click();', termsCheckbox);
    }
  }


  async proceedToCheckout() {
    const checkoutBtn = await this.driver.findElement(By.id('checkout'));
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', checkoutBtn);
    await this.driver.wait(until.elementIsVisible(checkoutBtn), 5000);
    await this.driver.executeScript('arguments[0].click();', checkoutBtn);
  }
}
