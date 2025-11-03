Feature: User Registration and Login

@scenario_001
Scenario: Register a new user successfully
  Given I am on the registration page
  When I complete the registration form
  Then I should see a successful registration message

@scenario_002
Scenario: Login as a registered user and purchase a product
  Given I am on the login page
  When I log in with valid credentials
  Then I should see that I am logged in
  When I add a product to the cart
  Then I should see the product in the cart
  When I proceed to checkout
  And I fill the checkout details and confirm order
  Then I should complete the purchase successfully

