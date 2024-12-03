var express = require('express');
var router = express.Router();

/* Check If Server Is Ok */
router.get('/', function(req, res, next) {
  res.send("server Is Working 🤞");
});

/* Get Functions From Controller */
const {
  getAllData,
  createUserData,
  deleteUserData,
  updateUserData
} = require("../controllers/userController");

/* Get Validate Functions From middleware */
const {
  checkBodyValidate,
  checkDataID
} = require("../middleware/userMiddleware");

/* GET Method */
router.get("/getAllData", getAllData);

/* POST Method */
router.post("/createData", checkBodyValidate, createUserData);

/* DELETE Method */
router.delete("/deleteData/:id", checkDataID, deleteUserData);

/* UPDATE Method */
router.put("/updateData/:id", checkDataID, checkBodyValidate, updateUserData);




module.exports = router;