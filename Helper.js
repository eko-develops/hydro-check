class Helper {
	static getFormattedDate() {
		const now = new Date();

		const nowFormatted = new Intl.DateTimeFormat('en-US')
			.format(now)
			.toString()
			.split('/')
			.join('-');

		return nowFormatted;
	}
}

module.exports = Helper;
