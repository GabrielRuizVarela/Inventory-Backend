const Item = require('../models/Item');
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
      res.json({ items: items, title: 'Items' });
    });
}

exports.create = (req, res, next) => {
  Category.find({}, 'name').sort({ name: 'asc' }).exec((err, categories) => {
    if (err) {
      return next(err);
    }
    res.json({ title: 'Create Item', categories: categories });
  });
}

exports.store = [
  body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
  body('stock', 'Stock must not be empty.').isLength({ min: 1 }).trim(),
  body('price', 'Price must not be empty.').isLength({ min: 1 }).trim(),
  body('description', 'Description must not be empty.').isLength({ min: 1 }).trim(),
  body('category', 'Category must not be empty.').isLength({ min: 1 }).trim(),
  body('url', 'URL must not be empty.').isLength({ min: 1 }).trim(),
  (req, res, next) => {
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
      url: req.body.url
    });
    item.save((err) => {
      if (err) {
        return next(err);
      }
      res.json(item);
    });
  }
]

exports.show = (req, res, next) => {
  Item.findById(req.params.id)
    .populate('category')
    .exec((err, item) => {
      if (err) {
        return next(err);
      }
      res.json(item);
    });
}

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