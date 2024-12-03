const {
  getDataFromMemory
} = require("../services/getTitlesService");



/**********************************************************************************************/
/************************************* GET Method *********************************************/
/**********************************************************************************************/
function getAllTitles(req, res, next) {
  try {
    const getData = getDataFromMemory();
    return res.status(201).json({
      message: "All titles have been retrieved successfully",
      data: getData
    })
  } catch (error) {
    console.log(error);
  }
}







// Export Functions
module.exports = {
  getAllTitles
};