
/*
 * POST home page.
 */

var passport = require('passport');

exports.page = function(req, res, next){
	if (req.user) {
		res.redirect('/');
		return;
    }

	passport.authenticate('local', function(err, user, info) {
		if (err) { return res.render('signuperror', { title: 'Fields not valid' }); }

		if (!user) { return res.render('homeerror', { title: 'Username and password does not match' }); }

		req.logIn(user, function(err) {
			if (err) { return res.send(500); }

			else { return res.render('home', { title: 'Welcome' }); }
		});
	})(req, res, next);
};