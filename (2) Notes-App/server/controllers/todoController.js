const {
  getAllTaskFromMemory,
  taskRequiredFields,
  createTaskObj,
  pushTaskToArray,
  checkTaskIndex,
  deleteTask,
  updateTask
} = require("../services/todoServices");

/**********************************************************************************************/
/************************************* GET Method *********************************************/
/**********************************************************************************************/

/* GET Method Controller */
function getAllTasks(req, res, next) {
  try {
    let tasks = getAllTaskFromMemory();
    return res.status(200).json({ status: 200, data: tasks });
  } catch (error) {
    console.log(error);
  }
}

/**********************************************************************************************/
/************************************* POST Method ********************************************/
/**********************************************************************************************/

function createNewTask(req, res, next) {
  const { title, description } = req.body;
  const taskRequired = taskRequiredFields(title, description);
  if (!taskRequired) {
    return res.status(400).json({
      status: 400,
      error: "Both 'title' and 'description' are required!",
    });
  }
  const createObj = createTaskObj(title, description);
  try {
    const pushTaskObj = pushTaskToArray(createObj);
    res.status(201).json({
      status: 201,
      data: { pushTaskObj, message: "Task added successfully!" },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Internal Server Error: " + error.message,
    });
  }
}

/**********************************************************************************************/
/************************************* UPDATE Method ******************************************/
/**********************************************************************************************/

function updateTaskByID(req, res, next) {
  try {
    const { title, description } = req.body;
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = checkTaskIndex(taskId);
    const taskRequired = taskRequiredFields(title, description);
    if (taskIndex !== -1) {
      if (taskRequired) {
        const update_task = updateTask(taskIndex, title, description);
        console.log(update_task);
        res.status(200).json({
          message: "Task updated successfully!",
          task: update_task,
        });
      } else {
        return res.status(400).json({
          status: 400,
          error:
            "Both 'title' and 'description' are required to update the task!",
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: "Task not found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error: " + error.message,
    });
  }
}

/**********************************************************************************************/
/************************************* DELETE Method ******************************************/
/**********************************************************************************************/

function deleteTaskByID(req, res, next) {
  try {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = checkTaskIndex(taskId);
    if (taskIndex !== -1) {
      const deletedTask = deleteTask(taskIndex);
      res.status(200).json({
        message: "Task deleted successfully!",
        task: deletedTask,
      });
    } else {
      res.status(404).json({
        status: 404,
        error: "Task not found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Server error!",
    });
  }
}



// Export Functions
module.exports = {
  getAllTasks,
  createNewTask,
  updateTaskByID,
  deleteTaskByID,
};