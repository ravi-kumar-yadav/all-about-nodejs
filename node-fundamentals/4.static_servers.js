'use strict';

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

let mimes = {
	'.htm': 'text/html',
	'.css': 'text/css',
	'.js':  'text/javascript',
	'.gif': 'image/gif',
	'.jpg': 'image/jpg',
	'.png': 'image/png'
};


function webserver(req, res) {
	// if the route is '/' then load 'index.html'
	// or else load requested file
	
	let baseURI = url.parse(req.url);
	let filePath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);

	console.log(filePath);

	// check for file is accessible or not
	fs.access(filePath, fs.F_OK, function (error) {
		if (!error) {
			// read and the file over response
			fs.readFile(filePath, function (error, content) {
				if (!error) {
					// resolve the content type
					let contentType = mimes[path.extname(filePath)];

					// serve the file from the buffer
					res.writeHead(200, {'Content-type': contentType})
					res.end(content, 'utf-8');
				} else {
					// serve a 500 error
					res.writeHead(500);
					res.end('The server could not read the file requested');
				}
			});
		} else {
			// serve 404
			res.writeHead(404);
			res.end('Content not found!');
		}
	});

}

http.createServer(webserver).listen(3000, function(){
	console.log('Webserver is running on port 3000');
});