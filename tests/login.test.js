const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Interview Mate - Login Tests', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    // options.addArguments('--headless');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }, 30000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async () => {
    await driver.get('http://localhost:3000');
    await driver.executeScript('window.localStorage.clear();');
    await driver.get('http://localhost:3000');
  });

  test('TC-008: Login form displays correctly with email, password, and submit button', async () => {
    // Navigate from Welcome to Auth page
    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    await startButton.click();

    // Verify Login tab is selected and fields exist
    const emailInput = await driver.wait(
      until.elementLocated(By.css('input[type="email"]')),
      5000
    );
    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    const loginButton = await driver.findElement(By.css('.auth-submit-btn'));

    expect(await emailInput.isDisplayed()).toBe(true);
    expect(await passwordInput.isDisplayed()).toBe(true);
    expect(await loginButton.isDisplayed()).toBe(true);
  }, 30000);

  test('TC-009: Toggle password visibility switches between password and text', async () => {
    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    await startButton.click();

    const passwordInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Enter your password"]')),
      5000
    );
    expect(await passwordInput.getAttribute('type')).toBe('password');

    // Click toggle button
    const toggleButton = await driver.findElement(By.css('.toggle-password'));
    await toggleButton.click();

    const toggledInput = await driver.findElement(By.css('input[placeholder="Enter your password"]'));
    expect(await toggledInput.getAttribute('type')).toBe('text');
  }, 30000);

  test('TC-010: Successful login redirects user to Onboarding for new account', async () => {
    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    await startButton.click();

    const emailInput = await driver.wait(
      until.elementLocated(By.css('input[type="email"]')),
      5000
    );
    const passwordInput = await driver.findElement(By.css('input[type="password"]'));

    await emailInput.sendKeys('student@example.com');
    await passwordInput.sendKeys('password123');

    const submitBtn = await driver.findElement(By.css('.auth-submit-btn'));
    await submitBtn.click();

    // Wait for Onboarding page to load (since user has not onboarded yet)
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Tell us about yourself') or contains(text(), 'Personal Info') or contains(@class, 'onboarding')]")),
      10000
    );

    const pageSource = await driver.getPageSource();
    expect(pageSource).toContain('Personal Info');
  }, 35000);

  test('TC-011: Login redirects existing onboarded user directly to Dashboard', async () => {
    // Seed onboarding data for the email
    await driver.executeScript(() => {
      const email = 'existing@example.com';
      const onboardedMap = {
        [email]: {
          fullName: 'Jane Doe',
          careerPath: 'software_engineering'
        }
      };
      window.localStorage.setItem('onboardedEmails', JSON.stringify(onboardedMap));
    });

    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    await startButton.click();

    const emailInput = await driver.wait(
      until.elementLocated(By.css('input[type="email"]')),
      5000
    );
    const passwordInput = await driver.findElement(By.css('input[type="password"]'));

    await emailInput.sendKeys('existing@example.com');
    await passwordInput.sendKeys('password123');

    const submitBtn = await driver.findElement(By.css('.auth-submit-btn'));
    await submitBtn.click();

    // Wait for Dashboard to appear directly
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Welcome back') or contains(@class, 'dashboard')]")),
      10000
    );

    const pageSource = await driver.getPageSource();
    expect(pageSource).toContain('Welcome back');
  }, 35000);

  test('TC-012: Session persistence after page refresh and logout flow', async () => {
    // Seed authenticated session
    await driver.executeScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ email: 'jane@example.com', name: 'Jane Doe' }));
      window.localStorage.setItem('onboarded', 'true');
    });

    await driver.get('http://localhost:3000');

    // Should load Dashboard directly
    const logoutBtn = await driver.wait(
      until.elementLocated(By.css('.logout-btn')),
      10000
    );
    expect(await logoutBtn.isDisplayed()).toBe(true);

    // Refresh page to verify persistence
    await driver.navigate().refresh();

    const refreshedLogoutBtn = await driver.wait(
      until.elementLocated(By.css('.logout-btn')),
      10000
    );
    expect(await refreshedLogoutBtn.isDisplayed()).toBe(true);

    // Click logout
    await refreshedLogoutBtn.click();

    // Verify redirected back to Welcome page
    const startButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Start Now')]")),
      10000
    );
    expect(await startButton.isDisplayed()).toBe(true);
  }, 35000);
});
