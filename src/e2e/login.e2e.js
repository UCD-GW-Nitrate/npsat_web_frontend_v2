const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Login page smoke test suits', () => {
  it('footer', async () => {
    await page.goto(`${BASE_URL}/user/login`);
    await page.waitForSelector('footer', {
      timeout: 2000,
    });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0,
    );
    expect(haveFooter).toBeTruthy();
  });

  it('Login fail', async () => {
    await page.goto(`${BASE_URL}/user/login`);
    await page.type('#userName', 'faker');
    await page.type('#password', 'LOL-Faker-password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-alert-error');
    const loginFail = await page.evaluate(
      () => document.getElementsByClassName('ant-alert-error').length === 1,
    );
    expect(loginFail).toBeTruthy();
  });
});
