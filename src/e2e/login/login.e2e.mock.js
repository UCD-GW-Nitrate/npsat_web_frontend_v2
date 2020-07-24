import { BASE_URL } from '@/e2e/config';

describe('Login page smoke test suits with mock data', () => {
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
    await page.setRequestInterception(true);
    await page.on('request', async (request) => {
      const url = await request.url();
      if (url.endsWith('/api-token-auth/')) {
        request.respond({
          status: 400,
          body: JSON.stringify({ non_field_errors: ['Random error msg'] }),
        });
      } else {
        request.continue();
      }
    });
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
    await page.setRequestInterception(true);
    await page.on('request', async (request) => {
      const url = await request.url();
      if (url.endsWith('/api-token-auth/')) {
        request.respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({
            token: 'random string tttoookkkenenene',
            user_id: 1000,
            username: 'xxx',
            is_staff: true,
            is_superuser: true,
            email: '',
          }),
        });
      } else {
        request.continue();
      }
    });
    await page.type('#userName', 'real');
    await page.type('#password', 'rrreeeaaalll');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('button[type="submit"]'),
    ]);
    const url = await page.url();
    await page.close();
    expect(url).toBe(`${BASE_URL}/dashboard`);
  });
});
