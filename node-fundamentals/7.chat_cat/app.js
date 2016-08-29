'use strict';

var express = require('express'),
    app = express(),
    path = require('path');

// set path to 'views' to serve pages
app.set('views', path.join(__dirname, 'views'));

// use Hogan templating engine
// render html pages by using method defined in hogan-express
app.engine('html', require('hogan-express'));

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.route('/').get(function (req, res, next) {
	// res.send('<h1>Hi, this is the sample response');
	// render will look for requested pages in 'views/'
	// as 'view' is set for app on line no. 8
	res.render('index', {title: 'Welcome to chatCAT'});
});

app.listen(3000, function() {
	console.log('chatCAT running on port 3000');
});
