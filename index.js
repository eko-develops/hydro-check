require('dotenv').config();
const puppeteer = require('puppeteer');
const { browserConfig } = require('./config.js');

(async () => {
	try {
		const browser = await puppeteer.launch(browserConfig);
		const page = await browser.newPage();
		await page.goto(process.env.URL);

		await page.click('#btnLogin');

		await page.waitForSelector('#email');

		await page.type('#email', process.env.USER, { delay: 20 });
		await page.type('#password', process.env.PASS, { delay: 30 });

		await page.keyboard.press('Enter');

		const now = new Date();
		const nowFormatted = new Intl.DateTimeFormat('en-US')
			.format(now)
			.toString()
			.split('/')
			.join('-');

		await page.waitForNavigation({ waitUntil: 'networkidle0' });

		await page.screenshot({ path: `images/${nowFormatted}.jpg` });
	} catch (err) {
		console.log(err);
	}
})();
