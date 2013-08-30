var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	uname: String,
	email: String,
});

mongoose.model('Users', UserSchema);

mongoose.connect("mongodb://localhost/trainingProject");