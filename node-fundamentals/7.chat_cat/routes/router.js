
module.exports = function (express, app) {

	var router = express.Router();

	router.get('/', function (req, res, next) {
		res.render('index', {title: 'Welcome to Index page'});		
	});

	router.get('/chatrooms', function (req, res, next) {
		res.render('chatrooms', {title: 'In chatRooms'});		
	});

	router.get('/setColor', function (req, res, next) {
		req.session.favColor = 'Red';
		res.end('Setting Favourite Color !!!');
	});

	router.get('/getColor', function (req, res, next) {
		console.log('Session: %s', JSON.stringify(req.session));
		res.send('Favourite Color: %s', req.session.favColor || 'Not Defined');		
	});

	app.use('/', router);
}
