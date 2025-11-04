import { Given, When, Then } from "@cucumber/cucumber";
import RegistrationPage from "../../pages/RegistrationPage.js";

let registrationPage;

Given("I am on the registration page", async function () {
  registrationPage = new RegistrationPage(this.driver);
  await registrationPage.open();
});

When("I complete the registration form", async function () {
  await registrationPage.fillRegistrationForm(
    "Demo",
    "User",
    "demo001@example.com",
    "welcome@123"
  );
 await registrationPage.submit();
});

Then("I should see a successful registration message", async function () {
  const message = await registrationPage.getSuccessMessage();
  if (!message.includes("Your registration completed")) {
    throw new Error("Registration failed");
  }
});
