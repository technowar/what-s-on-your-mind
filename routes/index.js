
/*
 * GET home page.
 */

exports.page = function(req, res){
	if (req.user) {	res.redirect('/home'); }

	else { res.render('index', { title: 'Training Project' }); }
};