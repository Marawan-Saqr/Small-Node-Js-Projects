// Decelare Variables
let tasks = [];

const getAllTaskFromMemory = () => {
  try {
    return tasks;
  } catch (error) {
    console.log(error);
  }
}


const taskRequiredFields = (title, description) => {
  try {
    if (!title && !description) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

const createTaskObj = (title, description) => {
  try {
    let task = {
      id: tasks.length + 1,
      title,
      description,
    }
    return task;
  } catch (error) {
    console.log(error);
  }
}


const pushTaskToArray = (task) => {
  try {
    tasks.push(task);
    return task;
  } catch (error) {
    console.log(error);
  }
}


const checkTaskIndex = (taskID) => {
  try {
    const taskIndex = tasks.findIndex((task) => task.id === taskID);
    return taskIndex;
  } catch (error) {
    console.log(error);
  }
}

const updateTask = (taskID, title, description) => {
  try {
    tasks[taskID].title = title;
    tasks[taskID].description = description;
    return tasks[taskID];
  } catch (error) {
    console.log(error.message);
  }
}


const deleteTask = (taskIndex) => {
  try {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  } catch (error) {
    console.log(error);
  }
}




module.exports = {
  getAllTaskFromMemory,
  taskRequiredFields,
  createTaskObj,
  pushTaskToArray,
  checkTaskIndex,
  updateTask,
  deleteTask,
}