var mongoose = require('mongoose');
var models = mongoose.models;

exports.init = function() {
	var UserSchema = mongoose.Schema({
		firstname: {
			type: String,
			required: true,
			match: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
		},
		lastname: {
			type: String,
			required: true,
			match: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
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
		}
	});

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

	mongoose.model('User', UserSchema);

	return mongoose.models;
};