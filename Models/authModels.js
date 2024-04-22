const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Define your roles here
    default: 'user', // Default role
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
