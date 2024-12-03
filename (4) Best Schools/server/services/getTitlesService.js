// Declare Variables
let navArray = [
  { id: 1, name: "Home", icon: "fa-solid fa-house", path: "/" },
  { id: 2, name: "All Schools", icon: "fa-solid fa-school-flag", path: "/schools" },
  { id: 3, name: "Add School", icon: "fa-solid fa-pen", path: "/add-school" }
];

const getDataFromMemory = () => {
  try {
    return navArray;
  } catch (error) {
    console.log(error);
  }
}






module.exports = {
  getDataFromMemory
}