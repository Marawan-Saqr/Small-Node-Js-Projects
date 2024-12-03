var express = require('express');
var router = express.Router();

/* GET index page */
router.get('/', function (req, res, next) {
  res.send("Welcome At Todo App");
});

// Todo App Functions

// Declare Variables
let tasks = [];


/* GET method */
router.get('/allTasks', function (req, res, next) {
  if (tasks.length === 0) {
    res.send(`No Data Available`);
  } else {
    res.json(tasks);
  }
});


/* POST method */
router.post('/create', function (req, res, next) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      status: 400,
      error: "Both 'title' and 'description' are required!",
    });
  }
  const task = {
    id: tasks.length + 1,
    title,
    description,
  };
  tasks.push(task);
  res.status(201).json({
    message: "Task added successfully!",
    task,
  });
});


/* Delete Method */
router.delete('/delete/:id', function (req, res, next) {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.status(200).json({
      message: "Task deleted successfully!",
      task: {
        id: deletedTask.id,
        title: deletedTask.title,
        description: deletedTask.description,
      },
    });
  } else {
    res.status(404).json({
      status: 404,
      error: "Task not found!",
    });
  }
});


/* Update Method */
router.put('/update/:id', function (req, res, next) {
  const taskId = parseInt(req.params.id, 10);
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    if (title && description) {
      tasks[taskIndex].title = title;
      tasks[taskIndex].description = description;
      res.status(200).json({
        message: "Task updated successfully!",
        task: tasks[taskIndex],
      });
    } else {
      res.status(400).json({
        status: 400,
        error: "Both 'title' and 'description' are required to update the task!",
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      error: "Task not found!",
    });
  }
});


module.exports = router;