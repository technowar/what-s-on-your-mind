
/*
 * GET home page.
 */

exports.user = function(req, res){
	req.logout();
	res.redirect('/');

	return;
};