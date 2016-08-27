'use strict';

const 	http = require('http'),
	url = require('url'),
	qs = require('querystring'),
	port = 3000;

const getRoute = {
	'GET': {
		'/': function (req, res) {
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end('In "/": ', JSON.stringify(req.queryParams));
		},

		'/home': function (req, res) {
			console.log('QueryParams: ', req.queryParams);
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end(JSON.stringify(req.queryParams));
		}
	},

	'POST': {
		'/logIn': function (req, res) {
			let body = '';
	
			req.on('data', function (data) {
				body += data;
				console.log('size: ', body.length);

				if (body.length > 1024) {
					console.log('Printed the error message');
					res.writeHead(413, {'Content-type': 'text/html'});
					res.end('<h3>Error: The file being uploaded exceeds the upper limit of 1KB</h3>');
					res.connection.destroy();
				}
			});

			req.on('end', function () {
				console.log('Final Length: ', body.length);
				res.writeHead(200, {'Content-type': 'text/html'});
				res.end('Length: ' +  body.length);
			});
		}
	},

	'NA': function (req, res) {
		res.writeHead(404, {'Content-type': 'text/html'});
		res.end('<h1>Page not found</h1>');
	}
};


function router(req, res) {
	let baseURL = url.parse(req.url, true),
	    isRoute = getRoute[req.method][baseURL.pathname];

	console.log('BaseURL: ', baseURL);

	if (isRoute) {
		req.queryParams = baseURL.query;
		isRoute(req, res);
	} else {
		getRoute['NA'](req, res);
	}
}

http.createServer(router).listen(port, function (req, res) {
	console.log('Server started on port %s', port);
});
