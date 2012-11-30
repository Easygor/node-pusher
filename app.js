
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, socket_io = require('socket.io');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

console.log("start http & socket.io server...");
var server = http.createServer(app);
var io = socket_io.listen(server);

io.configure(function() {
	io.set('transports', ['websocket', 'flashsocket', 'xhr-polling']);
});

io.configure('development', function() {
	io.set('transport', ['websocket', 'xhr-polling']);
	io.enable('log');
});

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
}); 

console.log("listening socket.io event...");
io.sockets.on('connection', function(socket) {
	console.log('some on connect...');

	socket.on('sub', function(data) {
		console.log('a client=' + socket.id + ', join the a room=' + data.topic);
		socket.join(data.topic)

	});

	socket.on('unsub', function(data) {
		socket.leave(data.topic);
	});

	socket.on('push', function(data, fn) {
		if(typeof data.to === 'undefined') {
			console.log('data.to is undefined, you must set dest');
			return;
		}

		if(typeof data.event === 'undefined') {
			console.log('data.event is undefined, you must set a event');
			return;
		}

		console.log('--room:' + data.to);
		console.log('--event:' + data.event);
		console.log('--bodyType:' + data.bodyType);
		console.log('--body:' + data.body);
	
		try {	
			var json = JSON.parse(data.body);
			io.sockets.in(data.to).emit(data.event, json);
		} catch(e) {
			console.log(e);
			io.sockets.in(data.to).emit(data.event, data.body);
		}

	});

	socket.on('disconnect', function() {
		console.log('disconnect...');
	});
});

