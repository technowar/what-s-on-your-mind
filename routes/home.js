
/*
 * POST home page.
 */

exports.page = function(req, res){
	res.render('home', { title: 'Welcome' });
};