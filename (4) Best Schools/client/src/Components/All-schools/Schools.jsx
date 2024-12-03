import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Schools.css";
import schoolImage from "./school.jpg";

const Schools = () => {

  // Component States
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();


  // Get All Schools Function
  const getAllSchools = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/schools/getAllSchools"
      );
      setSchools(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };


  // Delete School Function
  const deleteSchool = async (schoolID) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/schools/deleteSchool/${schoolID}`);
        setSchools(schools.filter((task) => task.id !== schoolID));
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting task:", error.message);
        Swal.fire('Error!', 'There was a problem deleting the task.', 'error');
      }
    }
  };


  // useEffect
  useEffect(() => {
    getAllSchools();
  }, []);


  return (
    <div className="all-schools">
      <div className="container">
        <div className="row">
          {schools.length > 0 ? (
            schools.map((school) => (
              <div key={school.id} className="col-lg-4 col-md-6">
                <div className="card school-card">
                  <img src={schoolImage} alt={school.schoolName} className="card-img-top school-card-image" />
                  <div className="card-body">
                    <h5 style={{fontWeight: 'bold', fontSize: '17px', margin: '0px'}}>{school.schoolName}</h5>
                    <p style={{margin: '10px 0px'}}>{school.description}</p>
                    <p><strong>Fees:</strong> ${school.fees}</p>
                    <p><strong>Rating:</strong> {school.rate} / 5</p>
                    <div className="button-group">
                      <button style={{marginRight: '5px'}} className="btn btn-primary" onClick={() => navigate(`/update-school/${school.id}`, { state: school })}>Update</button>
                      <button className="btn btn-danger" onClick={() => deleteSchool(school.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>
              No schools found <i className="fa-regular fa-face-sad-tear"></i>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};



export default Schools;