import { BASE_URL } from '@/e2e/config';

describe('overview smoke test suits with mock data', () => {
  it('login then click overview on menu', async () => {
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
    await page.hover('span[aria-label="appstore"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('a[href="/model/overview"]'),
    ]);
    const url = await page.url();
    await page.close();
    expect(url).toBe(`${BASE_URL}/model/overview`);
  })

  it('login then click overview on menu', async () => {
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
    await page.hover('span[aria-label="appstore"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('a[href="/model/overview"]'),
    ]);
    const url = await page.url();
    await page.close();
    expect(url).toBe(`${BASE_URL}/model/overview`);
  });

  it('login then click overview on menu', async () => {
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
    await page.hover('span[aria-label="appstore"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('a[href="/model/overview"]'),
    ]);
    const url = await page.url();
    await page.close();
    expect(url).toBe(`${BASE_URL}/model/overview`);
  })

  it('login redirect overview on menu', async () => {
    // eslint-disable-next-line no-undef
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login?redirect=http%3A%2F%2Flocalhost%3A8000%2Fmodel%2Foverview`);
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
    expect(url).toBe(`${BASE_URL}/model/overview`);
  });

  it('login redirect overview on menu | click new model', async () => {
    // eslint-disable-next-line no-undef
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login?redirect=http%3A%2F%2Flocalhost%3A8000%2Fmodel%2Foverview`);
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
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('button[class="ant-btn ant-btn-primary"]')
    ]);
    const url = await page.url();
    await page.close();
    expect(url).toBe(`${BASE_URL}/model/create`);
  });

})
