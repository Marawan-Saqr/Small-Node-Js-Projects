var express = require('express');
var router = express.Router();
const Joi = require("joi");
const { Book } = require("../models/BooksModel");

/* Check Server Is Ok */
router.get('/', function(req, res, next) {
  res.send('Server Is Ok');
});


/* Get All Books */
router.get('/getAllBooks', async function(req, res, next) {
  try {
    const bookList = await Book.find();
    res.status(200).json({
      message: "Data Retrived Successfully",
      data: bookList
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    })
  }
});


/* Get Book By Id */
router.get('/getBookById/:id', async function(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json({
        message: "Data Retrived Successfully",
        data: book
      })
    } else {
      res.status(404).json({
        message: "Book Not Found",
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    })
  }
});


/* Create New Book */
router.post('/createBook', async function(req, res, next) {
  try {
    const shcema = Joi.object({
      title: Joi.string().trim().min(3).max(200).required(),
      author: Joi.string().trim().min(3).max(200).required(),
      copies: Joi.number().min(3).max(200).required(),
      price: Joi.number().min(3).required(),
    })
    const { error } = shcema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      copies: req.body.copies,
      price: req.body.price
    })
    const result = await book.save();
    res.status(201).json({
      message: "Book Created Successfully",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    })
  }
});



/* Update Book */
router.put('/updateBook/:id', async function(req, res, next) {
  try {
    const shcema = Joi.object({
      title: Joi.string().trim().min(3).max(200).required(),
      author: Joi.string().trim().min(3).max(200).required(),
      copies: Joi.number().min(3).max(200).required(),
      price: Joi.number().min(3).required(),
    })
    const { error } = shcema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        author: req.body.author,
        copies: req.body.copies,
        price: req.body.price
      }
    }, { new: true });
    res.status(200).json({
      message: "Book Has Been Updated Successfully",
      data: book
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    })
  }
});


/* Delete Book */
router.delete('/deleteBook/:id', async function(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Book Has Been Deleted",
        data: book
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    })
  }
});



module.exports = router;