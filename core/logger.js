var log4js = require('log4js');

var options = {
	appenders: [{
		type : 'console'
	}, {
		type: 'file',
		filename: './logs/out.log',
		maxLogSize: 1024 * 20,
		backup: 5
	}]
};

// debug, info, warn, error
var level = 'info'

log4js.configure(options);

var logger = log4js.getLogger();
logger.setLevel(level);

exports.logger = logger;
exports.log4js = log4js;

