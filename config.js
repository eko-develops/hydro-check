const config = {
	width: 1200,
	height: 1080,
};

const browserConfig = {
	headless: false,
	defaultViewport: {
		width: config.width,
		height: config.height,
	},
	args: [`--window-size=${config.width},${config.height}`],
};

module.exports = { browserConfig };
