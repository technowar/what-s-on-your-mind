var mongoose = require('mongoose');
	
exports.init = function() {
	var UserSchema = mongoose.Schema({
		fname: {
			type: String,
			required: true,
			match: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
		},
		lname: {
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

	mongoose.model('User', UserSchema);

	return mongoose.models;
};