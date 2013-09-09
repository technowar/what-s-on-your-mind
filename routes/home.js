
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.page = function(req, res){
	if (req.user) {
		res.render('home', {
			title: 'Welcome',
			user: req.user,
			diaryInput: req.body
		});

		return;
	}

	else { return res.render('index', { title: 'Training Project' }); }
};

exports.diary = function(req, res) {
	res.end(JSON.stringify(req.body));

	var diaryContent = req.body.content.trim();
	var diaryData = {};

	diaryData.content = diaryContent;
	diaryData.owner = req.user._id;

	var diary = new models.Diary(diaryData);

	diary.save(function(err, diaryItem) {
		if (!err) {
			req.user.updateDiaries(diaryItem._id, function(err, result) {
				if (!err) { return console.log(diaryItem._id); }

				else { return console.log(err); }
			});
		}

		else {
			console.log(err);
		}
	});
};