const Category = require('../models/category');
const async = require('async');

const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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
  res.header('Access-Control-Allow-Origin', '*');
  Category.findOne({ 'name': req.body.name })
    .exec((err, found_category) => {
      if (err) {
        console.log(err)
        return next(err);
      }
      if (found_category) {
        res.status(422);
        res.json({ message: 'Category already exists' });
      } else {
        const category = new Category({
          name: req.body.name,
          description: req.body.description
        });
        category.save((err) => {
          if (err) {
            return next(err);
          }
          res.json(category);
          res.status(200);
        });
      }
    });
}

exports.update = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {}, (err, category) => {
    if (err) {
      return next(err);
    }
    res.json(category);
  });
}

exports.destroy = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // if category has items, do not delete
  Item.find({ 'category': req.params.id })
    .exec((err, items) => {
      if (err) {
        return next(err);
      }
      if (items.length > 0) {
        res.status(422);
        res.json({ message: 'Category is not empty' });
      } else {
        Category.findByIdAndRemove(req.params.id, (err) => {
          if (err) {
            return next(err);
          }
          res.json({ message: 'Category deleted' });
        });
      }
    }
    );
}