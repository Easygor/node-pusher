var Pusher = function(url) {
	this.socket = io.connect(url);
}

Pusher.prototype.sub = function(room, callback) {
	this.socket.emit('sub', {topic: room}, callback);
};

Pusher.prototype.unsub = function(room) {
	this.socket.emit('unsub', {topic: room});
};

Pusher.prototype.pub = function(to, event, json) {
	var params = {
		to: to,
		event: event,
		body: json
	}

	this.socket.emit('push', params);
};

Pusher.prototype.on = function(event, fun) {
	this.socket.on(event, fun);
};
