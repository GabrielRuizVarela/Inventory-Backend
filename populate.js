#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
const Item = require('./models/item');
const Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Items = []
var Categorys = []

// get the categorys from the database
// async.series([
//   function (callback) {
//     Category.find()
//       .exec(function (err, results) {
//         if (err) { callback(err) }
//         Categorys = results
//         callback()
//         console.log(results)
//       })
//   },
// ])


function itemCreate(name, stock, price, img_url, description, category, cb) {
  itemdetail = {
    name: name,
    stock: stock,
    price: price,
    img_url: img_url,
    description: description,
    category: category
  }

  var item = new Item(itemdetail);
  item.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Item: ' + item);
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    Items.push(item)
    cb(null, item)
  });
}

function categoryCreate(name, description, cb) {
  var category = new Category({ name: name, description: description });
  category.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Category: ' + category);
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    Categorys.push(category)
    cb(null, category);
  });
}

function createItems(cb) {
  async.parallel([
    function (callback) {
      itemCreate('Item 1', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 1 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 2', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 2 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 3', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 3 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 4', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 4 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 5', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 5 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 6', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 6 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 7', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 7 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 8', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 8 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 9', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 9 Description', Categorys[0], callback);
    },
    function (callback) {
      itemCreate('Item 10', 10, 10, 'https://source.unsplash.com/random/400x400/', 'Item 10 Description', Categorys[0], callback);
    },
  ],
    // optional callback
    cb);
}

function createCategorys(cb) {
  async.parallel([
    function (callback) {
      categoryCreate('Category 1', 'description', callback);
    },
    function (callback) {
      categoryCreate('Category 2', 'description', callback);
    },
    function (callback) {
      categoryCreate('Category 3', 'description', callback);
    },
    function (callback) {
      categoryCreate('Category 4', 'description', callback);
    },
  ],
    // optional callback
    cb);
}

// async.series([
//   createCategorys
// ],
//   // Optional callback
//   function (err, results) {
//     if (err) {
//       console.log('FINAL ERR: ' + err);
//     }
//     else {
//       console.log('Items Instances: ' + Items);

//     }
//     // All done, disconnect from database
//     mongoose.connection.close();
//   });
async.series([
  function (callback) {
    Category.find()
      .exec(function (err, results) {
        if (err) { callback(err) }
        Categorys = results
        callback()
        console.log(results)
      })
  },
  createItems
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('Items Instances: ' + Items);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });




