'use strict';

const qr = require('qr-image');
const fs = require('fs');

let inputText = process.argv[2],
    qrImageName = process.argv[3];

if (inputText && qrImageName) {
	qr.image(inputText, {
		type: 'png',
		size: 20
	}).pipe(fs.createWriteStream(qrImageName));

	console.log('QR image generated for %s', inputText);
} else {
	console.log("Error!!! node qr <input text> <qrImageName>");
}
