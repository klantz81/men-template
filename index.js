var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

MongoClient.connect("mongodb://localhost:27017/site", function(err, database) {
	if (err) throw err;

	require('./init')(app, database);
	require('./routes')(app, database);

	io.on('connection', function (socket) {
		console.log("connected - " + socket.id);
	});

	http.listen(3000, function(){
        	console.log('listening on port 3000');
	});
});
