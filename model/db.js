exports.signup = function(mongoose) {
	var UserSchema = mongoose.Schema({
		name: String,
		uname: String,
		email: String,
	});

	return mongoose.model('Users', UserSchema);
};