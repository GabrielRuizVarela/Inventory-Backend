const Item = require('../models/item');
const async = require('async');

const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
exports.index = (req, res, next) => {
  Item.find()
    .populate('category')
    .exec((err, items) => {
      if (err) {
        return next(err);
      }
      res.send(items);
    });
}

exports.store = [
  body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
  body('stock', 'Stock must not be empty.').isLength({ min: 1 }).trim(),
  body('price', 'Price must not be empty.').isLength({ min: 1 }).trim(),
  body('description', 'Description must not be empty.').isLength({ min: 1 }).trim(),
  body('category', 'Category must not be empty.').isLength({ min: 1 }).trim(),
  body('img_url', 'URL must not be empty.').isLength({ min: 1 }).trim(),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const item = new Item({
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      img_url: req.body.img_url
    });
    console.log(item)
    item.save((err) => {
      if (err) {
        return next(err);
      }
      res.json(item);
    });
  }
]

exports.edit = (req, res, next) => {
  console.log(req.params.id)
  async.parallel({
    item: (callback) => {
      Item.findById(req.params.id).exec(callback);
    },
    categories: (callback) => {
      Category.find({}, 'name').sort({ name: 'asc' }).exec(callback);
    }
  }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json({ title: 'Edit Item', item: results.item, categories: results.categories });
  });
}

exports.update = [
  body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
  body('stock', 'Stock must not be empty.').isLength({ min: 1 }).trim(),
  body('price', 'Price must not be empty.').isLength({ min: 1 }).trim(),
  body('description', 'Description must not be empty.').isLength({ min: 1 }).trim(),
  body('category', 'Category must not be empty.').isLength({ min: 1 }).trim(),
  body('img_url', 'URL must not be empty.').isLength({ min: 1 }).trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body)
    const item = new Item({
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      img_url: req.body.img_url,
      _id: req.params.id
    });
    Category.findById(item.category).then(res => console.log(res))
    Item.findByIdAndUpdate(req.params.id, item, {}, (err, theitem) => {
      if (err) {
        return next(err);
      }
      res.json(theitem);
    }
    );
  }
]

exports.destroy = (req, res, next) => {
  Item.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Item deleted successfully!' });
  });
}