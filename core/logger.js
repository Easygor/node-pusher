var path = require('path');
var fs = require('fs');
var log4js = require('log4js');

var logDir = path.join(__dirname, '..', 'logs');
console.log('log dir:' + logDir);

if (!fs.existsSync(logDir)) {
	console.log('The log dir is not existed! mkdir...');
	fs.mkdirSync(logDir);
}

var logFile = path.join(logDir, "out.log");
console.info('log file path:' + logFile);

var options = {
	appenders: [{
		type : 'console'
	}, {
		type: 'file',
		filename: logFile,
		maxLogSize: 1024 * 20,
		backup: 5
	}]
};

// debug, info, warn, error
var level = 'info';

log4js.configure(options);

var logger = log4js.getLogger();
logger.setLevel(level);

exports.logger = logger;
exports.log4js = log4js;

