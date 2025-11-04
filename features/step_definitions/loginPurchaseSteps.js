import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import LoginPage from "../../pages/loginPage.js";
import ProductPage from "../../pages/ProductPage.js";
import CartPage from "../../pages/cartPage.js";
import CheckoutPage from "../../pages/checkoutPage.js";

let checkoutPage;
let loginPage;
let productPage;
let cartPage;

setDefaultTimeout(30 * 1000); // 30 seconds

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

  await checkoutPage.selectShippingMethod();
  await checkoutPage.selectPaymentMethod();
  await checkoutPage.paymentInfo();



});


Then("I should complete the purchase successfully", async function () {

  await checkoutPage.confirmOrder(); // implement in ProductPage

});
