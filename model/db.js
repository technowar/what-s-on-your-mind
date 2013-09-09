var mongoose = require('mongoose');
var models = mongoose.models;

exports.init = function() {

/**
 * User Schema
 */

	var UserSchema = mongoose.Schema({
		firstname: {
			type: String,
			required: true,
			match: /^[\w\s]{1,20}$/
		},
		lastname: {
			type: String,
			required: true,
			match: /^[\w\s]{1,20}$/
		},
		username: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
			unique: true,
			match: /^[a-z0-9]{6,20}$/
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
			unique: true,
			match: /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
		},
		password: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
			match: /^.{6,20}$/
		},
		diaries: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Diary'
		}]
	});

/**
 * Update User
 */

	UserSchema.methods.validPassword = function(password) {
		if (this.password !== password) {
			return false;
		}

		return true;
	};

	UserSchema.methods.updateUser = function(firstname, lastname, callback) {
		models.User.update({
			_id: this._id
		}, {
			$set: {
				firstname: firstname,
				lastname: lastname
			}
		}, callback);
	};

	UserSchema.methods.updatePassword = function(password, callback) {
		models.User.update({
			_id: this._id
		}, {
			$set: {
				password: password
			}
		}, callback);
	};

	UserSchema.methods.updateDiaries = function(diaryId, callback) {
		models.User.update({
			_id: this._id
		}, {
			$push: {
				diaries: diaryId
			}
		}, callback);
	};

	mongoose.model('User', UserSchema);

/**
 * Diary Schema
 */

	var DiarySchema = mongoose.Schema({
		content: {
			type: String,
			required: true,
			match: /^[a-zA-Z]{1,160}$/
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	});

	mongoose.model('Diary', DiarySchema);

	return mongoose.models;
};