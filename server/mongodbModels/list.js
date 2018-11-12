const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ItemSchema } = require('./item');

const ListSchema = new Schema({
  userId: Schema.ObjectId,
  title: String,
  category: String,
  subCategories: [String],
  size: Number,
  items: [ItemSchema],
});

module.exports = {
  List: mongoose.model('list', ListSchema),
  ListSchema,
};