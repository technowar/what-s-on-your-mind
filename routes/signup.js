
/*
 * POST home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.user = function(req, res){
	var u = new models.User(req.body);

	u.save(function(err, user) {
		if (err) {
			res.render('signuperror', { title: 'Fields not valid' });

			return;
		}

		else { return res.redirect('/'); }
	});
};