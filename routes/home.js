
/*
 * GET home page.
 */

exports.page = function(req, res){
	if (req.user) {
		res.render('home', {
			title: 'Welcome',
			user: req.user
		});

		return;
	}

	else { return res.render('index', { title: 'Training Project' }); }
};