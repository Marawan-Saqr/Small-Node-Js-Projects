import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddSchool.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddSchool = () => {
  // Component States
  const navigate = useNavigate();

  // Zod schema
  const schema = z.object({
    schoolName: z
      .string()
      .nonempty({ message: "School name is required." })
      .min(3, { message: "School name must be at least 3 characters." }),
    description: z
      .string()
      .nonempty({ message: "Description is required." })
      .min(10, { message: "Description must be at least 10 characters." }),
    fees: z
      .number({ invalid_type_error: "Fees must be a number." })
      .min(0, { message: "Fees must be a positive number." }),
    rate: z
      .number({ invalid_type_error: "Rate must be a number." })
      .min(0, { message: "Rate must be at least 0." })
      .max(5, { message: "Rate must not exceed 5." }),
  });

  // React Hook Form Destruct
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  // Create School Function
  const createNewSchool = async (data) => {
    try {
      await axios.post("http://localhost:5000/schools/createSchool", data);
      Swal.fire({
        icon: "success",
        title: "School Created Successfully!",
        showConfirmButton: true,
      }).then(() => {
        navigate("/schools");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
      console.error(error);
    }
  };

  return (
    <div className="add-school-page">
      <div className="container">
        <div className="add-school-form">
          <h2 className="form-title">Add a New School</h2>
          <form onSubmit={handleSubmit(createNewSchool)}>
            <div className="form-group">
              <label htmlFor="school-name">School Name</label>
              <input
                type="text"
                id="school-name"
                placeholder="Enter school name"
                className="form-input"
                {...register("schoolName")}
              />
              {errors.schoolName && (
                <p className="error-message text-danger">
                  {errors.schoolName.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Enter description"
                className="form-textarea"
                {...register("description")}
              ></textarea>
              {errors.description && (
                <p className="error-message text-danger">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="fees">Fees</label>
              <input
                type="number"
                id="fees"
                placeholder="Enter fees"
                className="form-input"
                {...register("fees", { valueAsNumber: true })}
              />
              {errors.fees && (
                <p className="error-message text-danger">
                  {errors.fees.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="rate">Rate</label>
              <input
                type="number"
                id="rate"
                placeholder="Enter rate (0-5)"
                className="form-input"
                {...register("rate", { valueAsNumber: true })}
              />
              {errors.rate && (
                <p className="error-message text-danger">
                  {errors.rate.message}
                </p>
              )}
            </div>

            <button type="submit" className="form-button">
              Add School
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};



export default AddSchool;