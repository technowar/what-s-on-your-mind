
/*
 * POST home page.
 */
var mongoose = require('mongoose');
var models = mongoose.models;

exports.user = function(req, res){
	var u = new models.Users(req.body);

	u.save(function(err, user) {
		res.end(JSON.stringify(user));
	});
};