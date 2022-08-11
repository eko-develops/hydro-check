// require('dotenv').config();
const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');
const Helper = require('./Helper');

const KEY_PATH = path.join(
	__dirname,
	'..',
	'..',
	'..',
	'..',
	'..',
	'keys',
	`${process.env.KEY_NAME}.json`
);

const auth = new google.auth.GoogleAuth({
	keyFile: KEY_PATH,
	scopes: [process.env.SCOPES],
});

async function createAndUploadFile(auth) {
	try {
		const driveService = google.drive({ version: 'v3', auth });
		const formattedDate = Helper.getFormattedDate();

		const fileMetaData = {
			name: `${formattedDate}.jpg`,
			parents: [process.env.FOLDER_ID],
		};

		const media = {
			mimeType: 'image/jpg',
			body: fs.createReadStream(`images/${formattedDate}.jpg`),
		};

		const response = await driveService.files.create({
			resource: fileMetaData,
			media,
			fields: 'id',
		});

		if (response.status === 200) {
			console.log(`File created id: ${response.data.id}`);
		} else {
			throw new Error('response status not 200');
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = { createAndUploadFile, auth };
