
/*
 * GET/POST home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.page = function(req, res){
	if (req.user) {
		res.render('profile', {
			title: 'Edit Profile',
			user: req.user
		});

		return;
	}

	else { return res.render('index', { title: 'Training Project' }); }
};

exports.save = function(req, res){
	var newFirstname = req.body.firstname.trim();
	var newLastname = req.body.lastname.trim();

	if (!req.user) { return res.redirect('/'); }

	if (!newFirstname.match(/^[\w\s]+$/) || newFirstname.length > 20) { return res.render('updateerror', { title: 'Fields not valid' }); }

	if (!newLastname.match(/^[\w\s]+$/) || newLastname.length > 20) { return res.render('updateerror', { title: 'Fields not valid' }); }

	req.user.updateUser(newFirstname, newLastname, function(err, result) {
		if (!err) { return res.redirect('/home'); }

		else { return res.redirect('/home'); }
	});
};