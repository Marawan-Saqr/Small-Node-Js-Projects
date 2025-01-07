var express = require("express");
const Joi = require("joi");
var router = express.Router();

// Database
let books = [
  {
    id: 1,
    title: "Learn Basics Of Js",
    description: "Learn Basics Of Js In 2 Weeks",
    author: "John Doe",
    price: 300,
    cover: "Yellow Color",
  },
  {
    id: 2,
    title: "Learn Basics Of Html",
    description: "Learn Basics Of Js In 1 Weeks",
    author: "Salem Doe",
    price: 100,
    cover: "Red Color",
  },
];




/* Check If Server Is Ok */
router.get("/", function (req, res, next) {
  res.send(`Server Is Ok 🤞`);
});




/* Get All Books */
router.get("/allBooks", function (req, res, next) {
  try {
    if (!books || books.length === 0) {
      res.status(404).json({ message: "No Books Found", items: [] });
    } else {
      res.status(200).json({ message: "Get Items Successfully", items: books });
    }
  } catch (error) {
    res.status(500).json({ message: "An Error Occured", error: error.message });
  }
});




// Create New Book
router.post("/createBook", function (req, res, next) {
  try {
    const bookSchema = Joi.object({
      title: Joi.string().min(3).max(200).required(),
      description: Joi.string().min(3).max(200).required(),
      author: Joi.string().min(3).max(200).required(),
      price: Joi.number().min(0).positive().required(),
      cover: Joi.string().min(3).max(200).required(),
    });

    const { error } = bookSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: `Validation Error: ${error.details[0].message}` });
    }

    const book = {
      id: books.length + 1,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      price: req.body.price,
      cover: req.body.cover,
    };

    books.push(book);

    res
      .status(201)
      .json({ message: "Book Created Successfully", Newitem: book });
  } catch (error) {
    res.status(500).json({ message: "Error Occured While Creating Book" });
  }
});





// Update Book
router.put("/updateBook/:id", function (req, res, next) {
  try {
    // Validate the incoming data
    const bookSchema = Joi.object({
      title: Joi.string().min(3).max(200),
      description: Joi.string().min(3).max(200),
      author: Joi.string().min(3).max(200),
      price: Joi.number().min(0).positive(),
      cover: Joi.string().min(3).max(200),
    });

    const { error } = bookSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: `Validation Error: ${error.details[0].message}` });
    }

    const bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    books[bookIndex] = { ...books[bookIndex], ...req.body };

    res.status(200).json({ message: "Book Updated Successfully", updatedBook: books[bookIndex] });
  } catch (error) {
    res.status(500).json({ message: "Error Occurred While Updating Book", error: error.message });
  }
});



// Delete The Book
router.delete("/deleteBook/:id", function (req, res, next) {
  try {
    const bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.status(200).json({ message: "Book Deleted Successfully", deletedBook: deletedBook[0] });
  } catch (error) {
    res.status(500).json({ message: "Error Occurred While Deleting Book", error: error.message });
  }
});


module.exports = router;