const { 
  getDataFromMemory
} = require("../services/userService");


// Check If Body Found
function checkBodyValidate(req, res, next) {
  const { userName, userAge, userCity, userStatus } = req.body;
  if (!userName || !userAge || !userCity || !userStatus) {
    return res.status(400).json({
      status: 400,
      error: "Some fields are missing",
    });
  }
  next();
}


// Check For ID
function checkDataID(req, res, next) {
  const dataID = parseInt(req.params.id, 10);
  if (isNaN(dataID)) {
    return res.status(400).json({ error: "Invalid ID format!" });
  }
  const taskIndex = getDataFromMemory().findIndex(task => task.id === dataID);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found!" });
  }
  req.taskIndex = taskIndex;
  next();
}






module.exports = {
  checkBodyValidate,
  checkDataID
};