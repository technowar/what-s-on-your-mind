
/*
 * GET/POST home page.
 */

exports.page = function(req, res){
	if (req.user) {	res.render('password', { title: 'Edit Password' }); }

	else { res.render('index', { title: 'Training Project' }); }
};

exports.save = function(req, res){
	var newPassword = req.body.newpassword.trim();
	var confirmPassword = req.body.confirmpassword.trim();

	if (!req.user) { res.redirect('/'); }

	if (newPassword.length === 0 || newPassword === '') { res.render('passworderror', { title: 'Fields not valid' }); }

	if (newPassword !== confirmPassword) { res.render('passworderror', { title: 'Password does not match' }); }

	req.user.updatePassword(newPassword, function(err, result) {
		if (!err) { res.redirect('/home'); }

		else { res.redirect('/home'); }
	});
};