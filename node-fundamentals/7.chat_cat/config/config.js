/*
module.exports = {
	'development': require('./development.json'),
	'production': require('./production.json')
}
*/

module.exports = require('./' + (process.env.NODE_ENV || 'development') + '.json');
