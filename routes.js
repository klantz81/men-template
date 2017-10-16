var bcrypt = require('bcrypt');

module.exports = function(app, db) {

	app.get('/', function(req, res) {
	        db.collection('content').find({id:"index"}).toArray(function(err, doc) {
			var data = "";
			if (doc.length == 1)
	                	data = doc[0].content;
			res.render('index', { title: 'Site Template', content: data });
	        });
	});

	app.get('/logout', function(req, res) {
		req.session.destroy();
		res.redirect('/admin');
	});

	app.all('/admin', function(req, res) {
		let error = '';

		if (typeof(req.session.admin_access) == 'undefined')
			req.session.admin_access = false;

		if (req.body.action && req.body.action == "admin-login") {
			let email = req.body.email;
			let password = req.body.password;

			let salt_rounds = 10;
			let salt = bcrypt.genSaltSync(salt_rounds);
			let hash = bcrypt.hashSync("testing", salt);

			if (email == "testing" && bcrypt.compareSync(password, hash)) {  // testing
				req.session.email = email;
				req.session.admin_access = true;
			} else {
				error = "The email address or password is incorrect.";
			}
		}

		if (!req.session.admin_access) {
			res.render('admin-login.html', { title: 'Admin Template', content: error }); // JSON.stringify(req.query)+JSON.stringify(req.body)
		} else {
			db.collection('content').find({id:"admin"}).toArray(function(err, doc) {
				var data = "";
				if (doc.length == 1)
		                	data = doc[0].content;
				res.render('admin.html', { title: 'Admin Template', content: data+JSON.stringify(req.session) });
		        });
		}
	});

};
