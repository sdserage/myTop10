const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ListSchema } = require('./list');

const UserSchema = new Schema({
  auth0ID: String,
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  lists: [ListSchema],
});

module.exports = {
  User: mongoose.model('user', UserSchema),
  UserSchema,
};