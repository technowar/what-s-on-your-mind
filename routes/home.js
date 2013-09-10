
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var models = mongoose.models;

exports.page = function(req, res){
	if (req.user) {

		var myDiary = models.Diary;

		myDiary.find({}, function(err, docs) {
			if (err) { return console.log(err); }

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

	console.log(diaryData); // Delete this after

	d.save(function(err, diary) {
		if (err) { return console.log(err);	} // Error trap this

		else {
			req.user.updateDiaries(diary._id, function(err, result) {
				if (!err) {
					res.redirect('/home');
					console.log('Added!'); // Delete this after
				}

				else { return console.log(err); } // Error trap this
			});
		}
	});
};