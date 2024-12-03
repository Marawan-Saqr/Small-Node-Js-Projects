import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddNote.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddNote = () => {

  // Component States
  const navigate = useNavigate();


  // Zod schema
  const schema = z.object({
    title: z
      .string()
      .nonempty()
      .min(3, { message: "Title must be at least 3 characters." }),
    description: z
      .string()
      .nonempty()
      .min(10, { message: "Description must be at least 10 characters." }),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });


  const createNewNote = async (data) => {
    try {
      await axios.post("http://localhost:9000/createTask", data);
      Swal.fire({
        icon: "success",
        title: "Task Created Successfully!",
        showConfirmButton: true,
      }).then(() => {
        navigate("/todo");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
      console.log(error);
    }
  };



  return (
    <div className="container">
      <div className="add-note-form">
        <h1 className="form-title">Add a New Note</h1>
        <form onSubmit={handleSubmit(createNewNote)}>
          <div className="form-group">
            <label htmlFor="note-title">Title</label>
            <input
              type="text"
              id="note-title"
              placeholder="Enter note title"
              className="form-input"
              {...register("title")}
            />
            {errors.title && (
              <p className="error-message text-danger">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="note-description">Description</label>
            <textarea
              id="note-description"
              placeholder="Enter note description"
              className="form-textarea"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="error-message text-danger">
                {errors.description.message}
              </p>
            )}
          </div>
          <button type="submit" className="form-button">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};



export default AddNote;