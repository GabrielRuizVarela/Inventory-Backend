require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const categoriesRouter = require('./routes/categories');
var app = express();


var cors = require('cors')
const corsOptions = {
  origin: true,
  credentials: true,
}
app.options('*', cors(corsOptions)); // preflight OPTIONS; put before other routes
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80');
});



// db
const DBkey = process.env.DB_URI
const mongoDB = process.env.MONGODB_URI || DBkey;
const mongoose = require('mongoose');
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
