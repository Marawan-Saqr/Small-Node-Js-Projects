// Decelare Variables
let dataList = [];

// Get Data From Memory
function getDataFromMemory() {
  try {
    return dataList;
  } catch (error) {
    console.log(error);
  }
}

// Push Data To Array
function pushDataToArray(data) {
  try {
    dataList.push(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Delete Data Form Array
function deleteDataFromArray(index) {
  const [deletedData] = dataList.splice(index, 1);
  return deletedData;
}

// Update Data Function
function updateData(index, data) {
  const { userName, userAge, userCity, userStatus } = data;
  const dataIndex = dataList[index];
  dataIndex.userName = userName;
  dataIndex.userAge = userAge;
  dataIndex.userCity = userCity;
  dataIndex.userStatus = userStatus;
  return dataIndex;
}










module.exports = {
  getDataFromMemory,
  pushDataToArray,
  deleteDataFromArray,
  updateData
}