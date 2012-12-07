var socket_io = require('socket.io');

exports.listen = function (httpServer) {
	var io = socket_io.listen(httpServer);

	io.configure(function () {
		io.set('transports', ['websocket', 'flashsocket', 'xhr-polling']);
	});

	io.configure('development', function () {
		io.set('transport', ['websocket', 'xhr-polling']);
		io.enable('log');
	});
	
	return io;
};
