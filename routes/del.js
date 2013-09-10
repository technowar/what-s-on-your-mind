
/*
 * DELETE home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.diary = function(req, res) {
	if (req.user) {
		var myDiary = models.Diary;
		// var diaryId = req.params.diaryId;

		myDiary.remove({ _id: req.params.diaryId }, function(err) {
			if (err) { return console.log(err); } // Error trap this

			else { return res.redirect('/home'); }
		});
	}

	else { return res.render('index', { title: 'Training Project' }); }
};