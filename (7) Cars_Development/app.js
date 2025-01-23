var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

// Connection To Database
mongoose.connect("mongodb://127.0.0.1:27017/carsDB")
.then(()=> console.log("Connected To Cars Database"))
.catch((error)=> console.log("Connection Failed To MongoDB", error));

// Define Routes
var carsRouter = require('./routes/cars');
var ownerRouter = require('./routes/owners');


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Call Routes
app.use('/cars', carsRouter);
app.use('/owners', ownerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;