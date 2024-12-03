const {
  getDataFromMemory,
  pushDataToArray,
  deleteDataFromArray,
  updateData,
} = require("../services/userService");

/**********************************************************************************************/
/************************************* GET Method *********************************************/
/**********************************************************************************************/

function getAllData(req, res, next) {
  try {
    let dataArray = getDataFromMemory();
    return res.status(200).json({ status: 200, data: dataArray });
  } catch (error) {
    console.log(error);
  }
}

/**********************************************************************************************/
/************************************* POST Method ********************************************/
/**********************************************************************************************/

function createUserData(req, res, next) {
  try {
    const { userName, userAge, userCity, userStatus } = req.body;
    let dataArray = getDataFromMemory();
    const userData = {
      id: dataArray.length + 1,
      userName,
      userAge,
      userCity,
      userStatus,
    };
    pushDataToArray(userData);
    res.status(201).json({
      message: "userData added successfully!",
      userData,
    });
  } catch (error) {
    console.log(error);
  }
}

/**********************************************************************************************/
/************************************* DELETE Method ******************************************/
/**********************************************************************************************/

function deleteUserData(req, res, next) {
  try {
    const taskIndex = req.taskIndex;
    const deletedData = deleteDataFromArray(taskIndex);
    if (!deletedData) {
      return res.status(500).json({ error: "Failed to delete the data!" });
    }
    res.status(200).json({
      message: "Data Deleted Successfully!",
      data: {
        id: deletedData.id,
        userName: deletedData.userName,
        userAge: deletedData.userAge,
        userCity: deletedData.userCity,
        userStatus: deletedData.userStatus,
      },
    });
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

/**********************************************************************************************/
/************************************* UPDATE Method ******************************************/
/**********************************************************************************************/

function updateUserData(req, res) {
  try {
    const { userName, userAge, userCity, userStatus } = req.body;
    const taskIndex = req.taskIndex;
    const updatedData = updateData(taskIndex, { userName, userAge, userCity, userStatus });
    res.status(200).json({
      message: "Data Updated Successfully!",
      updatedDataValue: updatedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}




// Export Functions
module.exports = {
  getAllData,
  createUserData,
  deleteUserData,
  updateUserData,
};
