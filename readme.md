WibDemo - Cucumber BDD Test Automation 
This project demonstrates a Cucumber.js test automation setup using ES Modules, with step definitions, hooks, and HTML reporting.

Features

BDD-style testing using Cucumber.js

Organized feature files and step definitions

Built-in HTML report generation without JSON dependency

Easy to run with one command

Folder Structure
WibDemo/
├─ features/
│  ├─ login.feature
│  └─ checkout.feature
│
├─ features/step_definitions/
│  ├─ loginSteps.js
│  └─ checkoutSteps.js
│
├─ hooks/
│  └─ hooks.js
│
├─ reports/
│  └─ simple-report.html
│
├─ cucumber.js
└─ package.json

Installation
Step 1: Clone the Repository
git clone https://github.com/VivithaRajkumar/WibDemo.git
cd WibDemo

Step 2: Install Dependencies
npm install

Configuration

Your cucumber.js file is already configured to:

Load feature and step definition files

Generate an HTML report directly in the reports folder

Running Tests

To execute all feature files and generate the HTML report:

npx cucumber-js --format html:reports/simple-report.htm


After the test run completes, the HTML report will be available at:

reports/simple-report.html
<img width="1334" height="1015" alt="image" src="https://github.com/user-attachments/assets/8287c474-bf6b-4184-96c5-f0472a984208" />



Open it in any browser to view the results.




