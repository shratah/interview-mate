const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Interview Mate - Mock Interview Tests', () => {
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
    // Set authenticated state and onboarded to go straight to dashboard
    await driver.executeScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ email: 'test@example.com', name: 'Alex' }));
      window.localStorage.setItem('onboarded', 'true');
    });
    await driver.get('http://localhost:3000');
  });

  test('TC-013: Navigate to Mock Interview screen from Dashboard', async () => {
    const startInterviewBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn-large')),
      10000
    );
    await startInterviewBtn.click();

    // Verify interview readiness screen
    const readyHeading = await driver.wait(
      until.elementLocated(By.xpath("//h2[contains(text(), 'Ready to Begin?')]")),
      10000
    );
    expect(await readyHeading.isDisplayed()).toBe(true);

    const startBtn = await driver.findElement(By.css('.start-interview-btn'));
    expect(await startBtn.isDisplayed()).toBe(true);
  }, 30000);

  test('TC-014: Start Interview loads first question and progress indicator', async () => {
    const startInterviewBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn-large')),
      10000
    );
    await startInterviewBtn.click();

    const startBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn')),
      10000
    );
    await startBtn.click();

    // Verify first question appears
    const questionBubble = await driver.wait(
      until.elementLocated(By.css('.message-bubble.interviewer')),
      10000
    );
    const questionText = await questionBubble.getText();
    expect(questionText).toContain("Tell me about yourself and why you're interested in this internship");

    // Verify progress text
    const progressText = await driver.findElement(By.css('.progress-text'));
    expect(await progressText.getText()).toContain('Question 1 of 5');
  }, 30000);

  test('TC-015: Send button is disabled when answer input is empty', async () => {
    const startInterviewBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn-large')),
      10000
    );
    await startInterviewBtn.click();

    const startBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn')),
      10000
    );
    await startBtn.click();

    await driver.wait(
      until.elementLocated(By.css('.message-bubble.interviewer')),
      10000
    );

    const sendBtn = await driver.findElement(By.css('.send-btn'));
    expect(await sendBtn.isEnabled()).toBe(false);
  }, 30000);

  test('TC-016: Submitting an answer posts response and triggers next question', async () => {
    const startInterviewBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn-large')),
      10000
    );
    await startInterviewBtn.click();

    const startBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn')),
      10000
    );
    await startBtn.click();

    const answerInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder*="Type your answer"]')),
      10000
    );

    await answerInput.sendKeys('I am a computer science student passionate about web development.');

    const sendBtn = await driver.findElement(By.css('.send-btn'));
    expect(await sendBtn.isEnabled()).toBe(true);
    await sendBtn.click();

    // Candidate message should appear
    const candidateMessage = await driver.wait(
      until.elementLocated(By.css('.message-bubble.candidate')),
      10000
    );
    expect(await candidateMessage.getText()).toContain('passionate about web development');

    // Wait for next question to arrive (after processing)
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Question 2 of 5')]")),
      10000
    );

    const progressText = await driver.findElement(By.css('.progress-text'));
    expect(await progressText.getText()).toContain('Question 2 of 5');
  }, 35000);

  test('TC-017: Voice input microphone button toggles recording status', async () => {
    const startInterviewBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn-large')),
      10000
    );
    await startInterviewBtn.click();

    const startBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn')),
      10000
    );
    await startBtn.click();

    const micBtn = await driver.wait(
      until.elementLocated(By.css('.mic-btn')),
      10000
    );
    await micBtn.click();

    // Check recording hint appears
    const hint = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Recording...')]")),
      5000
    );
    expect(await hint.isDisplayed()).toBe(true);
  }, 30000);

  test('TC-018: Back button returns candidate to Dashboard', async () => {
    const startInterviewBtn = await driver.wait(
      until.elementLocated(By.css('.start-interview-btn-large')),
      10000
    );
    await startInterviewBtn.click();

    const backBtn = await driver.wait(
      until.elementLocated(By.css('.back-btn')),
      10000
    );
    await backBtn.click();

    // Verify user is back on Dashboard
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Welcome back')]")),
      10000
    );

    const pageSource = await driver.getPageSource();
    expect(pageSource).toContain('Welcome back');
  }, 30000);
});
