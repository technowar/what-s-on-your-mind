
/*
 * GET/POST home page.
 */

exports.page = function(req, res){
	if (req.user) {
		res.render('profile', {
			title: 'Edit Profile',
			user: req.user
		});
	}

	else { res.render('index', { title: 'Training Project' }); }
};

exports.save = function(req, res){
	var newFirstname = req.body.firstname.trim();
	var newLastname = req.body.lastname.trim();

	if (!req.user) { res.redirect('/'); }

	req.user.updateUser(newFirstname, newLastname, function(err, result) {
		if (!err) { res.redirect('/home'); }

		else { res.redirect('/home'); }
	});
};