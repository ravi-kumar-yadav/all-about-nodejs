'use strict';

const http = require('http');
const url = require('url');

let routes = {
	'GET': {
		'/': function (req, res) {
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end('<h1>Hello Router at "/"</h1>');
		},
		'/about': function (req, res) {
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end('<h1>Hello Router at "/about"</h1>');
		},
		'/home/getInfo': function (req, res) {
			res.writeHead(200, {'Content-type': 'application/json'});
			res.end(JSON.stringify(req.queryParams));
		}
	},
	'POST': {

	},
	'NA': function (req, res) {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end('<h1>Hello NA</h1>');
	}
};


function router(req, res) {
	let baseURI = url.parse(req.url, true);
	console.log('BaseURI: ', baseURI);
	let resolveRoute = routes[req.method][baseURI.pathname];

	if (resolveRoute) {
		req.queryParams = baseURI.query;
		resolveRoute(req, res);
	} else {
		routes['NA'](req, res);
	}
}

http.createServer(router).listen(7342, function (){
	console.log('Server started on port:7342');
});
