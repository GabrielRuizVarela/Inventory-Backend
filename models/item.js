const moongose = require('mongoose');
const Schema = moongose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId, ref: 'Category',
    required: true
  }
});

module.exports = Item = moongose.model('Item', ItemSchema);