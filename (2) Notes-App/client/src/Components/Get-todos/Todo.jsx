import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Todo.css";

const Todo = () => {

  // Component States
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();


  // Get All Tasks Function
  const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/allTasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };


  // Delete Task Function
  const deleteTask = async (taskId) => {
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
        await axios.delete(`http://localhost:9000/deleteTask/${taskId}`);
        setTasks(tasks.filter((task) => task.id !== taskId));
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting task:", error.message);
        Swal.fire('Error!', 'There was a problem deleting the task.', 'error');
      }
    }
  };


  // UseEffect
  useEffect(() => {
    getAllTasks();
  }, []);


  return (
    <div className="todos-cards">
  <div className="container">
    <div className="row">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-4">
            <div className="card">
              <span>{task.title}</span>
              <p className="info">{task.description}</p>
              <div className="button-group">
                <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                <button className="update" onClick={() => navigate(`/update-note/${task.id}`, { state: task })}>Update</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ color: "#fff", textAlign: "center" }}>No tasks found</h1>
      )}
    </div>
  </div>
</div>
  );
};

export default Todo;