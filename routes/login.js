
/*
 * POST home page.
 */

var passport = require('passport');

exports.page = function(req, res, next){
	passport.authenticate('local', function(err, user, info) {
		if (err) { return res.render('signuperror', { title: 'Fields not valid' }); }

		if (!user) { return res.render('homeerror', { title: 'Username and password does not match' }); }

		req.logIn(user, function(err) {
			if (err) { return res.send('Bad Request'); }

			else { res.redirect('/home'); }
		});
	})(req, res, next);
};