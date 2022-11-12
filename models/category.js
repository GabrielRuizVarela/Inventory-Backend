const moongose = require('mongoose');
const Schema = moongose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Category = moongose.model('Category', CategorySchema);