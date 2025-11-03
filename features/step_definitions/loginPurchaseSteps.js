import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import LoginPage from "../../pages/loginPage.js";
import ProductPage from "../../pages/ProductPage.js";
import CartPage from "../../pages/cartPage.js";
import CheckoutPage from "../../pages/checkoutPage.js";

let checkoutPage;

setDefaultTimeout(30 * 1000); // 30 seconds

let loginPage;
let productPage;
let cartPage;

Given("I am on the login page", async function () {
  loginPage = new LoginPage(this.driver);
  await loginPage.open();
});

When("I log in with valid credentials", async function () {
  await loginPage.loginWithSavedCredentials();
});

Then("I should see that I am logged in", async function () {
  const loggedIn = await loginPage.isLoggedIn();
  if (!loggedIn) throw new Error("Login failed");
});

When("I add a product to the cart", async function () {
  productPage = new ProductPage(this.driver);
  await productPage.open(); // go to home page
  await productPage.selectProduct("Apple MacBook Pro"); // select product
  await productPage.addToCart();
});

Then("I should see the product in the cart", async function () {
  cartPage = new CartPage(this.driver);
  await cartPage.open();
  const cartItems = await cartPage.getCartItemNames();
  if (!cartItems.includes("Apple MacBook Pro")) {
    throw new Error("Product not found in the cart");
  }
});

When("I proceed to checkout", async function () {
  await cartPage.proceedToCheckout();
  await cartPage.acceptTerms();
});



When("I fill the checkout details and confirm order", async function () {
  checkoutPage = new CheckoutPage(this.driver);
  await checkoutPage.open();

  await checkoutPage.fillBillingAddress({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    country: "United States",
    city: "New York",
    address: "123 Main St",
    zip: "10001",
    phone: "1234567890"
  });
  
//   const continueButtons = [
//       "button.new-address-next-step-button",
//       "button.shipping-method-next-step-button",
//       "button.payment-method-next-step-button",
//       "button.payment-info-next-step-button",
//       "button.confirm-order-next-step-button"
//     ];

//     for (const selector of continueButtons) {
//       try {
//         const button = By.css(selector);
//         await this.driver.wait(until.elementLocated(button), 10000);
//         await this.driver.findElement(button).click();
//         await this.driver.sleep(2000);
//       } catch (err) {
//         console.log(`Skipping ${selector} (not visible at this step)`);
//       }}
  await checkoutPage.selectShippingMethod("Ground");
  await checkoutPage.selectPaymentMethod("Check / Money Order");

  const confirmation = await checkoutPage.confirmOrder();
  if (!confirmation.includes("Thank you")) {
    throw new Error("Checkout failed");
  }
});


Then("I should complete the purchase successfully", async function () {
  
  await cartPage.proceedToCheckout();
  const confirmation = await productPage.getOrderConfirmation(); // implement in ProductPage
  if (!confirmation.includes("Thank you")) {
    throw new Error("Checkout failed");
  }
});
