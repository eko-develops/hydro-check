const puppeteer = require('puppeteer');
const { browserConfig } = require('./config.js');

(async () => {
	try {
		const browser = await puppeteer.launch(browserConfig);
		const page = await browser.newPage();
		await page.goto('https://quotes.toscrape.com/');
	} catch (err) {
		console.log(err);
	}
})();
