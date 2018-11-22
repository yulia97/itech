var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    id: {
	type: String
    },
    email: {
	type: String,
	unique: true,
	require: true
    },
    password: {
	type: String
    },
    role: {
	type: String
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};
