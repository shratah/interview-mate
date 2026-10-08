const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Interview Mate - Welcome Page Tests', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    // options.addArguments('--headless'); // Uncomment to run without browser UI
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test('TC-001: Welcome page loads successfully', async () => {
    await driver.get('http://localhost:3000');
    
    const title = await driver.getTitle();
    console.log('Page title:', title);

    // Check if "Start Now" button exists
    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );

    expect(await startButton.isDisplayed()).toBe(true);
  }, 30000);

  test('TC-002: Clicking Start Now navigates to Auth page', async () => {
    await driver.get('http://localhost:3000');

    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    await startButton.click();

    // Wait for the Auth page to load
    await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Login')]")),
      10000
    );

    const pageSource = await driver.getPageSource();
    expect(pageSource).toContain('Login');
    expect(pageSource).toContain('Sign Up');
  }, 30000);

  test('TC-003: Hero section contains correct title', async () => {
    await driver.get('http://localhost:3000');

    const heroTitle = await driver.wait(
      until.elementLocated(By.css('.hero-title')),
      10000
    );

    const titleText = await heroTitle.getText();
    console.log('Hero title:', titleText);

    expect(titleText).toContain('Interview Mate');
  }, 30000);
});