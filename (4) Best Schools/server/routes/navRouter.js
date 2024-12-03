var express = require('express');
var router = express.Router();

/* Check If Server Is Ok */
router.get('/', function(req, res, next) {
  res.send(`Responds With 🤞`);
});

/* Get Functions From Controller */
const {
  getAllTitles
} = require("../controllers/getTitlesController");

/* GET Method */
router.get('/getAllTitles', getAllTitles);






module.exports = router;