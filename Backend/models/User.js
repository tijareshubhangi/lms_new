const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
});

module.exports = mongoose.model('User', UserSchema);
