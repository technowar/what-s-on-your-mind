
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

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

exports.diary = function(req, res) {

	var diaryContent = req.body.content.trim();
	var diaryData = {};

	diaryData.content = diaryContent;
	diaryData.owner = req.user._id;

	var diary = new models.Diary(diaryData);

	console.log(diary._id);

	diary.save(function(err, diaryItem) {
		if (!err) {
			req.user.updateDiaries(diaryItem._id, function(err, result) {
				if (!err) { return console.log(result); }

				else { return console.log(err); }
			});
		}

		else {
			console.log(err);
		}
	});
};