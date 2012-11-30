$(function() {
	var url = 'http://192.168.1.6:3000/';
	var room = '/column';

	var pusher = new Pusher(url);

	pusher.sub(room, function(data) {
		console.log('subscribe /column room success.');
		console.log(data);
	});

	pusher.on('news', function(data) {
		console.log('receive data from xx room.');
		console.log(data);
	});

	$('#btnSent').click(function() {
		var text = $('#message').val();
		pusher.push(room, 'news', {sender: 'lvjian', msg: text});

		$('#message').val('');
	});
});
