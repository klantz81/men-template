var fs = require('fs');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var db;

app.engine('html', function(filePath, options, callback) {
    fs.readFile(filePath, 'utf8', function(err, str) {
        if (err) return callback(err);

	for (var i in options) {
		if (i == 'settings' || i == '_locals' || i == 'cache')
			continue;
		var re = new RegExp('{{'+i+'}}', 'g');
		str = str.toString().replace(re, options[i]);
	}

        return callback(null, str);
    });
});

app.use('/dist', express.static(path.join(__dirname, 'dist'), {maxage: '0h'}))
app.set('views', './views');
app.set('view engine', 'html');

app.get('/', function (req, res) {
        db.collection('content').find({id:"index"}).toArray(function(err, doc) {
		var data = "";
		if (doc.length == 1)
                	data = doc[0].content;
		res.render('index', { title: 'Site Template', content: data });
        });
});

app.get('/admin', function (req, res) {
        db.collection('content').find({id:"admin"}).toArray(function(err, doc) {
		var data = "";
		if (doc.length == 1)
                	data = doc[0].content;
		res.render('admin.html', { title: 'Admin Template', content: data });
        });

});

MongoClient.connect("mongodb://localhost:27017/site", function(err, database) {
	if (err) throw err;
	db = database;

	io.on('connection', function (socket) {
		console.log("connected - " + socket.id);
	});

	http.listen(3000, function(){
        	console.log('listening on port 3000');
	});
});
