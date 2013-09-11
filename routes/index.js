
/*
 * GET home page.
 */

exports.page = function(req, res){
	if (req.user) { return res.redirect('/home'); }

	else { return res.render('index', { title: 'What\'s On Your Mind' }); }
};