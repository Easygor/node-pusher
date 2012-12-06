var logger = require('./logger').logger;

exports.start = function(io) {

	io.sockets.on('connection', function(socket) {
		logger.info('a client connect to pusher .');
		logger.info('client id:' + socket.id);

		socket.on('sub', function(data) {
			logger.info('a client=' + socket.id + ', join the room=' + data.topic);
			socket.join(data.topic)
		});

		socket.on('unsub', function(data) {
			logger.info('a client=' + socket.id + ', level the room=' + data.topic);
			socket.leave(data.topic);
		});

		socket.on('push', function(data, fn) {
			logger.info('a client pusher a message');
			logger.info('checking message format...');

			logger.debug('checking [to] property...');
			if(typeof data.to === 'undefined') {
				logger.error('data.to is undefined, you must set dest');
				return;
			}
			logger.debug('--to:' + data.to);
			
			logger.debug('checking [event] property...');
			if(typeof data.event === 'undefined') {
				logger.error('data.event is undefined, you must set a event');
				return;
			}
			logger.debug('--event:' + data.event);
			
			logger.info('the message data:');
			logger.info('--room:' + data.to);
			logger.info('--event:' + data.event);
			logger.info('--body:' + data.body);

			logger.info('parsing [data.body] to json ...');
			try {	
				var json = JSON.parse(data.body);

				logger.info('parse successed, push it to client ...');
				io.sockets.in(data.to).emit(data.event, json);
			} catch(e) {
				logger.error(e);
				logger.warn('parse fail, push [data.body] as plain text to client ...');
				io.sockets.in(data.to).emit(data.event, data.body);
			}

		});

		socket.on('disconnect', function() {
			logger.info('a client disconnected, id=' + socket.id);
		});
	});

};
