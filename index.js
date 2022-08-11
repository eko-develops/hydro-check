require('dotenv').config();
const puppeteer = require('puppeteer');
const { browserConfig } = require('./config.js');
const Helper = require('./Helper.js');
const { createAndUploadFile, auth } = require('./drive.js');

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

		const nowFormatted = Helper.getFormattedDate();

		await page.waitForNavigation({ waitUntil: 'networkidle0' });

		setTimeout(async () => {
			await page.screenshot({ path: `images/${nowFormatted}.jpg` });
			await createAndUploadFile(auth);
			setTimeout(async () => {
				await browser.close();
			}, 5000);
		}, 2000);
	} catch (err) {
		console.log(err);
	}
})();
