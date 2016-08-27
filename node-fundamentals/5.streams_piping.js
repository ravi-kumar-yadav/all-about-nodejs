'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let mimes = {
	'.htm': 'text/html',
	'.css': 'text/css',
	'.js':  'text/javascript',
	'.gif': 'image/gif',
	'.png': 'image/png',
	'.jpg': 'image/jpg'
};


function f1Pipe(data, cb) {
	console.log('Data: %s', data);
	console.log('f1Pipe %s', data.strip(0, 5));
	return cb(null, data);
}

function f2Pipe(data) {
	console.log('f2Pipe %s', data.strip(0, 5));
	return data;
}

function readFile(filePath, req, res) {
	// check for file is accessible or not 
	fs.access(filePath, fs.F_OK, function (error) {
		if (!error) {

			let stream = fs.createReadStream(filePath);

			stream.on('open', function () {
				console.log('In stream.on("open")');		
			});

			stream.on('data', function (data) {
				console.log('In stream.data() with length: %s', data.length);
			});

			stream.on('end', function () {
				console.log('In stream.end()');
			});

			stream.on('error', function (error) {
				console.log('Error: ', error);
			});

			/*
			fs.readFile(filePath, function (error, content){
				if (!error) {
					let contentType = mimes[path.extname(filePath)];

					// serve the file from buffer
					res.writeHead(200, {'Content-type': contentType});
					res.end(content);
				} else {
					res.writeHead(500);
					res.end('Server could not read the file');
				}
			});
			*/

			stream.pipe(res);
		} else {
			// serve a 404
			res.writeHead(404);
			res.end('Could not find the file');
		}
	});

}

function webServer(req, res) {
	// if route is '/' then load 'index.htm'
	// else load requested file

	let baseURI = url.parse(req.url);
	let filePath = __dirname + (baseURI.pathname === '/' ? '/index' : baseURI.pathname);
	
	console.log("FilePath: %s", filePath);

	readFile(filePath, req, res);
}


http.createServer(webServer).listen(3000, function(){
	console.log('Server running on port no. 3000');		
});
