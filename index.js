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

		await page.type('#email', process.env.USER, { delay: 80 });
		await page.type('#password', process.env.PASS, { delay: 90 });

		await page.keyboard.press('Enter');
	} catch (err) {
		console.log(err);
	}
})();
