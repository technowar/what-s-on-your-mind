var mongoose = require('mongoose');

exports.init = function() {
	var UserSchema = mongoose.Schema({
		name: String,
		username: String,
		email: String,
		password: String
	});

	UserSchema.methods.validPassword = function(password) {
		if (this.password !== password) {
			return false;
		}

		return true;
	};

	mongoose.model('Users', UserSchema);

	return mongoose.models.Users;
};