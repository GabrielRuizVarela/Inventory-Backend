const Category = require('../models/category');
const async = require('async');

const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  Category.find()
    .sort([['name', 'ascending']])
    .exec((err, categories) => {
      if (err) {
        return next(err);
      }
      res.json(categories);
    });
}

exports.create = (req, res, next) => {
  // check if category already exists
  Category.findOne({ 'name': req.body.name })
    .exec((err, found_category) => {
      if (err) {
        return next(err);
      }
      if (found_category) {
        res.json({ message: 'Category already exists' });
      } else {
        const category = new Category({
          name: req.body.name
        });
        category.save((err) => {
          if (err) {
            return next(err);
          }
          res.json(category);
        });
      }
    });
}

exports.update = (req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {}, (err, category) => {
    if (err) {
      return next(err);
    }
    res.json(category);
  });
}

exports.destroy = (req, res, next) => {
  Category.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Category deleted' });
  });
}