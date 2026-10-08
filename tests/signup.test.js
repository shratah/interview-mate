const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Interview Mate - Signup Tests', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--no-sandbox');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test('TC-004: Signup form displays correctly', async () => {
    await driver.get('http://localhost:3000');

    // Click Start Now
    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    await startButton.click();

    // Click Sign Up tab
    const signupTab = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Sign Up')]")),
      10000
    );
    await signupTab.click();

    // Wait for name input
    await driver.wait(
      until.elementLocated(By.css('input[type="text"]')),
      5000
    );

    const pageSource = await driver.getPageSource();
    expect(pageSource).toContain('Full Name');
    expect(pageSource).toContain('Email Address');
    expect(pageSource).toContain('Password');
  }, 30000);

  test('TC-005: Password mismatch shows error', async () => {
    await driver.get('http://localhost:3000');

    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    await startButton.click();

    const signupTab = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Sign Up')]")),
      10000
    );
    await signupTab.click();

    // Fill the form
    const nameInput = await driver.findElement(By.css('input[type="text"]'));
    await nameInput.sendKeys('Test User');

    const emailInput = await driver.findElement(By.css('input[type="email"]'));
    await emailInput.sendKeys('test@example.com');

    const passwordInputs = await driver.findElements(By.css('input[type="password"]'));
    await passwordInputs[0].sendKeys('password123');
    await passwordInputs[1].sendKeys('differentpass');

    // Click submit
    const submitBtn = await driver.findElement(
      By.xpath("//button[contains(text(), 'Create Account')]")
    );
    await submitBtn.click();

    // Wait for error message
    await driver.wait(
      until.elementLocated(By.css('.error-message')),
      5000
    );

    const errorElement = await driver.findElement(By.css('.error-message'));
    const errorText = await errorElement.getText();

    expect(errorText).toContain('Passwords do not match');
  }, 30000);
});