
/*
 * POST home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.user = function(req, res){
	var u = new models.Users(req.body);

	u.save(function(err, user) {
		if (err) { res.render('fourhundred', { title: 'Bad Request' }); }

		else { res.redirect('/'); }
	});
};