import { BASE_URL } from '@/e2e/config';
import { username, password } from '@/e2e/local_config';

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

  it('Login success', async () => {
    await page.goto(`${BASE_URL}/user/login`);
    await page.type('#userName', username);
    await page.type('#password', password);
    await page.click('button[type="submit"]');
    const url = await page.url();
    expect(url).toBe(`${BASE_URL}/dashboard`);
  });
});
