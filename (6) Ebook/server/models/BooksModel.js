const mongoose = require("mongoose");


const BookSchem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 200
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 200
  },
  copies: {
    type: Number,
    required: true,
    trim: true,
    min: 1,
    max: 10000
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  }
}, {
  timestamps: true
})


const Book = mongoose.model("Book", BookSchem);

module.exports = {
  Book
}