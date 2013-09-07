
/*
 * GET home page.
 */

exports.page = function(req, res){
	if (req.user) {	res.render('home', { title: 'Welcome!' });  }

	else { res.render('index', { title: 'Training Project' }); }
};