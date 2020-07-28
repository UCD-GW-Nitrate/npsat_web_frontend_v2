import { BASE_URL } from '@/e2e/config';
import { username, password } from '@/e2e/local_config';

describe('Login page smoke test suits with backend support', () => {
  it('footer', async () => {
    // eslint-disable-next-line no-undef
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login`);
    await page.waitForSelector('footer', {
      timeout: 2000,
    });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0,
    );
    await page.close();
    expect(haveFooter).toBeTruthy();
  });

  it('Login fail', async () => {
    // eslint-disable-next-line no-undef
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login`);
    await page.type('#userName', 'faker');
    await page.type('#password', 'LOL-Faker-password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-alert-error');
    const loginFail = await page.evaluate(
      () => document.getElementsByClassName('ant-alert-error').length === 1,
    );
    await page.close();
    expect(loginFail).toBeTruthy();
  });

  it('Login success', async () => {
    // eslint-disable-next-line no-undef
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login`);
    await page.type('#userName', username);
    await page.type('#password', password);
    await Promise.all([page.waitForNavigation(), page.click('button[type="submit"]')]);
    const url = await page.url();
    await page.close();
    expect(url).toBe(`${BASE_URL}/`);
  });

  it('Login info incomplete #1', async () => {
    // eslint-disable-next-line no-undef
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login`);
    await page.type('#userName', 'faker');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-form-item-explain');
    const infoIncomplete = await page.evaluate(
      () => document.getElementsByClassName('ant-form-item-explain').length === 1,
    );
    await page.close();
    expect(infoIncomplete).toBeTruthy();
  });

  it('Login info incomplete #2', async () => {
    // eslint-disable-next-line no-undef
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login`);
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-form-item-explain');
    const infoIncomplete = await page.evaluate(
      () => document.getElementsByClassName('ant-form-item-explain').length === 2,
    );
    await page.close();
    expect(infoIncomplete).toBeTruthy();
  });
});
