const { 
  getDataFromMemory
} = require("../services/schoolsServices");

// Check Body If Valid
const checkBodyValidate = (req, res, next) => {
  const { schoolName, description, fees, rate } = req.body;
  if (!schoolName || !description || !fees || !rate) {
    return res.status(400).json({
      status: 400,
      error: "Some Fields Are Missing",
    });
  }
  next();
};


// Check Index Of Data Before Any Action
function checkDataID(req, res, next) {
  const dataID = parseInt(req.params.id, 10);
  if (isNaN(dataID)) {
    return res.status(400).json({ error: "Invalid ID format!" });
  }
  const taskIndex = getDataFromMemory().findIndex(task => task.id === dataID);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "School not found!" });
  }
  req.taskIndex = taskIndex;
  next();
}















module.exports = {
  checkBodyValidate,
  checkDataID
};
