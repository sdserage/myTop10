const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  description: String,
  nextItemID: String,
  details: String,
  pictures: [String],
});

const ListSchema = new Schema({
  title: String,
  category: String,
  subCategories: [String],
  size: Number,
  items: [ItemSchema],
});

const UserSchema = new Schema({
  auth0ID: String,
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  lists: [ListSchema],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;