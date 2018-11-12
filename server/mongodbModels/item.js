const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  listId: Schema.ObjectId,
  name: String,
  description: String,
  nextItemID: String,
  details: String,
  pictures: [String],
});

module.exports = {
  Item: mongoose.model('item', ItemSchema),
  ItemSchema,
};