
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

	console.log(diaryData);

	diary.save(function(err, d) {
		if (err) { return res.send('Error'); }

		else {
			req.user.updateDiaries(d._id);
		}
	});
};