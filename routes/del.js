
/*
 * DELETE home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.diary = function(req, res) {
	if (req.user) {
		var myDiary = models.Diary;

		myDiary.remove({ diarycontent: req.params.name }, function(err) {
			if (err) { console.log(err); } // Error trap this

			else {
				res.send('WOot');
				// res.redirect('/home');
			}
		});
	}

	else { return res.render('index', { title: 'Training Project' }); }
};