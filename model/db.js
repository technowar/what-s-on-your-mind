var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	age: Number
});

mongoose.model('Users', UserSchema);

mongoose.connect("mongodb://localhost/trainingProject");