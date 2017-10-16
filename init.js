var fs = require('fs');
var path = require('path');
var express = require('express');
var body_parser = require('body-parser');
var session = require('express-session');

module.exports = function(app, db) {

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

	app.use(body_parser.json());
	app.use(body_parser.urlencoded({extended: true}));
	app.use(session({secret: 'somethingsecret', resave: false, saveUninitialized: true}));

	app.set('views', './views');
	app.set('view engine', 'html');

};
