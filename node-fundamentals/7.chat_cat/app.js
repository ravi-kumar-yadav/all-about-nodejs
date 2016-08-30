'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session);

// set path to 'views' to serve pages
app.set('views', path.join(__dirname, 'views'));

// use Hogan templating engine
// render html pages by using method defined in hogan-express
app.engine('html', require('hogan-express'));

app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser());

/*
app.route('/').get(function (req, res, next) {
	// res.send('<h1>Hi, this is the sample response');
	// render will look for requested pages in 'views/'
	// as 'view' is set for app on line no. 8
	res.render('index', {title: 'Welcome to chatCAT'});
});
*/

var env = process.env.NODE_ENV || 'development';


if (env === 'production') {
	console.log('Prod level configs');
	app.use(session({secret: config.sessionSecret,
		store: new ConnectMongo({
			url: config.dbURL,
			stringify: true
		})
	}));

} else if (env === 'development') {
	console.log('Develop level configs');
	app.use(session({secret: config.sessionSecret}));
}

require('./routes/router')(express, app);

app.listen(3000, function() {
	console.log('chatCAT running on port 3000\nMode: %s', env);
});
