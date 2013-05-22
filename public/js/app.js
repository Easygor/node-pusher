$(function() {
	var url = 'http://localhost:3000/';
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
		pusher.pub(room, 'news', {sender: 'lvjian', msg: text});

		$('#message').val('');
	});
});
