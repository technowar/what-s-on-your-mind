
/*
 * GET/POST home page.
 */

exports.page = function(req, res){
	if (req.user) { return res.render('password', { title: 'Edit Password' }); }

	else { return res.render('index', { title: 'What\'s On Your Mind' }); }
};

exports.save = function(req, res){
	var newPassword = req.body.newpassword.trim();
	var confirmPassword = req.body.confirmpassword.trim();

	if (!req.user) { return res.redirect('/'); }

	if (newPassword.length === 0 || newPassword === '') { return res.render('updateerror', { title: 'Fields not valid' }); }

	if (newPassword !== confirmPassword) { return res.render('updateerror', { title: 'Password does not match' }); }

	req.user.updatePassword(newPassword, function(err, result) {
		if (!err) { return res.redirect('/home'); }

		else { return res.redirect('/home'); }
	});
};