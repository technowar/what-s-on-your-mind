
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.page = function(req, res){
	if (req.user) {
		var myDiary = models.Diary;

		myDiary.find({}, function(err, docs) {
			if (err) { return res.render('updateerror', { title: 'Something went wrong' }); }

			else {
				res.render('home', {
					title: 'Welcome',
					user: req.user,
					diaries: docs
				});
			}
		});

		return;
	}

	else { return res.render('index', { title: 'Training Project' }); }
};

exports.diary = function(req, res) {
	var diaryContent = req.body.diarycontent.trim();
	var diaryData = {};

	diaryData.diarycontent = diaryContent;
	diaryData.owner = req.user._id;

	var d = new models.Diary(diaryData);

	d.save(function(err, diary) {
		if (err) { return res.render('updateerror', { title: 'Something went wrong' });	}

		else {
			req.user.updateDiaries(diary._id, function(err, result) {
				console.log(diary); // Delete this after

				if (err) { return res.render('updateerror', { title: 'Something went wrong' }); }

				else { return res.redirect('/home'); }
			});
		}
	});
};