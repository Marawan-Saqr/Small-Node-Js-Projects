const {
  getDataFromMemory,
  createSchoolData,
  deleteSchoolData,
  updateSchoolData
} = require("../services/schoolsServices");

/**********************************************************************************************/
/************************************* GET Method *********************************************/
/**********************************************************************************************/

function getAllSchools(req, res, next) {
  try {
    const getData = getDataFromMemory();
    return res.status(201).json({
      message: "All schools have been retrieved successfully",
      data: getData,
    });
  } catch (error) {
    console.log(error);
  }
}

/**********************************************************************************************/
/************************************* POST Method ********************************************/
/**********************************************************************************************/

function createSchool(req, res, next) {
  try {
    const { schoolName, description, fees, rate } = req.body;
    const getData = getDataFromMemory();
    const schoolCreation = createSchoolData(
      schoolName,
      description,
      fees,
      rate
    );
    getData.push(schoolCreation);
    res.status(201).json({
      message: "School Created Successfully!",
      getData,
    });
  } catch (error) {
    console.error("Error occurred in createSchool:", error);
    res.status(500).json({
      message: "An error occurred while creating the school.",
      error: error.message,
    });
  }
}

/**********************************************************************************************/
/************************************* DELETE Method ******************************************/
/**********************************************************************************************/

function deleteSchool(req, res, next) {
  try {
    const taskIndex = req.taskIndex;
    const deletedSchool = deleteSchoolData(taskIndex);
    if (!deletedSchool) {
      return res.status(500).json({ error: "Failed to delete the data!" });
    }
    res.status(200).json({
      message: "School deleted successfully!",
      schoolData: {
        id: deletedSchool.id,
        schoolName: deletedSchool.title,
        description: deletedSchool.description,
        fees: deletedSchool.description,
        rate: deletedSchool.description,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

/**********************************************************************************************/
/************************************* UPDATE Method ******************************************/
/**********************************************************************************************/

function updateSchool(req, res) {
  try {
    const { schoolName, description, fees, rate } = req.body;
    const taskIndex = req.taskIndex;
    const updatedData = updateSchoolData(taskIndex, { schoolName, description, fees, rate });
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
  getAllSchools,
  createSchool,
  deleteSchool,
  updateSchool
};
