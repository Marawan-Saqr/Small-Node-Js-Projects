var express = require('express');
var router = express.Router();

/* Check Server Is Ok */
router.get('/', function(req, res, next) {
  res.send(`server is ✌️`);
});



/* Get Functions From Controller */
const {
  getAllTasks,
  createNewTask,
  updateTaskByID,
  deleteTaskByID
} = require("../controllers/todoController");



/* GET Method */
router.get('/allTasks', getAllTasks);

/* POST Method */
router.post('/createTask', createNewTask);

/* UPDATE Method */
router.put('/updateTask/:id', updateTaskByID);

/* DELETE Method */
router.delete('/deleteTask/:id', deleteTaskByID);







module.exports = router;