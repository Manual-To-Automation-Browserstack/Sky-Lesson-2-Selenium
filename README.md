![Logo](https://www.browserstack.com/images/static/header-logo.jpg)

# Manual To Automation @ SKY - Lesson 2 Exam Answers <a href="https://nodejs.org/en/"><img src="https://brandslogos.com/wp-content/uploads/images/large/nodejs-icon-logo.png" alt="nodejs" height="22" /></a>

## Introduction

This code provides the solution to the exam given at the end of the second lesson in the Manual To Automation @ SKY training series. It is a simple NodeJS application that uses Selenium Webdriver to open a web page, open the search hover, and perform a search.

The trick to this solution is in figuring out how to navigate the contents of the iFrame that contains the consent box that appears on the page. Users need to research how to switch to these iFrames in order to find the elements contained within. They also need to figure out how to move back to the main HTML body after that interaction.

---

## Repository setup

- Clone the repository

- Ensure you have the following dependencies installed on the machine
  - NodeJS >= 14.16.0 (includes npm 6.14.11)

- Run below command to configure dependencies

    ```sh
    npm install
    ```

## Available Tests

  This repository contains the following NodeJS tests:

  | Module   | Test name                          | Description |
  | ---   | ---                                   | --- |
  | Local WebDriver      | Simple Search                | This test runs using the npm install of selenium-webdriver to set up a local Chrome driver and navigate to the page using it. |
  | Single BS    | Simple Search          | This test is the same as the first but it uses BrowserStack to open the webpage remotely. |
  | Parallel BS    | Simple Search               | This runs the Simple Search test across 5 different devices in parallel. |
  
  ---

# BrowserStack

[BrowserStack](https://browserstack.com) provides instant access to 2,000+ real mobile devices and browsers on a highly reliable cloud infrastructure that effortlessly scales as testing needs grow.

## Prerequisites

- Create a new [BrowserStack account](https://www.browserstack.com/users/sign_up) or use an existing one.
- Identify your BrowserStack username and access key from the [BrowserStack Automate Dashboard](https://automate.browserstack.com/) and export them as environment variables using the below commands.

    - For \*nix based and Mac machines:

  ```sh
  export BROWSERSTACK_USERNAME=<browserstack-username> &&
  export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```

    - For Windows:

  ```shell
  set BROWSERSTACK_USERNAME=<browserstack-username>
  set BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```
  
  Alternatively, you can also hardcode username and access_key objects in conf files related to BrowserStack in a file under `./resources/conf/`.
