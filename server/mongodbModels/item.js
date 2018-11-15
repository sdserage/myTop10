const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  list: {type: Schema.Types.ObjectId, ref: 'list'},
  name: String,
  description: String,
  nextItem: {type: Schema.Types.ObjectId, ref: 'item'},
  details: String,
  pictures: [String],
});

// module.exports = {
//   Item: mongoose.model('item', ItemSchema),
//   ItemSchema,
// };

module.exports = mongoose.model('item', ItemSchema);