const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  password: {
    type: String,
    required: 'Password is required',
    minlength: 8,
  },
  username: {
    type: String,
    required: 'Username is required',
    trim: true
  },
});

module.exports = User = mongoose.model('User', userSchema)

