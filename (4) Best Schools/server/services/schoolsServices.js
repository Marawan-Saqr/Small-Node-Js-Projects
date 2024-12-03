// Declare Variables
let schoolsArray = [];

const getDataFromMemory = () => {
  try {
    return schoolsArray;
  } catch (error) {
    console.log(error);
  }
};


const createSchoolData = (schoolName, description, fees, rate) => {
  try {
    const school = {
      id: schoolsArray.length + 1,
      schoolName,
      description,
      fees,
      rate
    };
    return school;
  } catch (error) {
    console.log(error);
  }
}

const deleteSchoolData = (id) => {
  try {
    const [deletedTask] = schoolsArray.splice(id, 1);
    return deletedTask;
  } catch (error) {
    console.log(error);
  }
}


function updateSchoolData(index, data) {
  const { schoolName, description, fees, rate } = data;
  const dataIndex = schoolsArray[index];
  dataIndex.schoolName = schoolName;
  dataIndex.description = description;
  dataIndex.fees = fees;
  dataIndex.rate = rate;
  return dataIndex;
}


module.exports = {
  getDataFromMemory,
  createSchoolData,
  deleteSchoolData,
  updateSchoolData
};