
/*
 * DELETE home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.diary = function(req, res) {
	if (req.user) {
		var name = req.params.id;
		
		console.log(name);
		res.redirect('/home');

		return;
	}

	else { return res.render('index', { title: 'Training Project' }); }
};