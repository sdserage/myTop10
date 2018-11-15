const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { ItemSchema } = require('./item');

const ListSchema = new Schema({
  // userId: Schema.ObjectId,
  author: {type: Schema.Types.ObjectId, ref: 'user'}, 
  title: String,
  category: String,
  subCategories: [String],
  size: Number,
  items: [{type: Schema.Types.ObjectId, ref: 'item'}],
});

// module.exports = {
//   List: mongoose.model('list', ListSchema),
//   ListSchema,
// };

module.exports = mongoose.model('list', ListSchema);