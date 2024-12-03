var express = require('express');
var router = express.Router();

/* Check If Server Is Ok */
router.get('/', function(req, res, next) {
  res.send(`Responds With 🤞`);
});

const {
  checkBodyValidate,
  checkDataID
} = require("../middleware/schools");

/* Get Functions From Controller */
const {
  getAllSchools,
  createSchool,
  deleteSchool,
  updateSchool
} = require("../controllers/SchoolsController");

/* GET Method */
router.get('/getAllSchools', getAllSchools);

/* POST Method */
router.post('/createSchool',checkBodyValidate, createSchool);

/* DELETE Method */
router.delete('/deleteSchool/:id',checkDataID, deleteSchool);

/* UPDATE METHOD */
router.put('/updateSchool/:id', checkDataID, checkBodyValidate, updateSchool);




module.exports = router;