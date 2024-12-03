import "./UpdateSchool.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";



const UpdateSchool = () => {

  // Component States
  const { state } = useLocation();
  const navigate = useNavigate();


  // Zod Schema Validation
  const schoolSchema = z.object({
    schoolName: z
      .string()
      .nonempty("School name is required")
      .min(3, "School name must be at least 3 characters long")
      .max(100, "School name cannot exceed 100 characters"),
    description: z
      .string()
      .nonempty("Description is required")
      .min(5, "Description must be at least 5 characters long")
      .max(500, "Description cannot exceed 500 characters"),
    fees: z
      .number({ invalid_type_error: "Fees must be a number" })
      .min(0, "Fees cannot be negative"),
    rate: z
      .number({ invalid_type_error: "Rate must be a number" })
      .min(0, "Rate cannot be less than 0")
      .max(5, "Rate cannot exceed 5"),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schoolSchema) });


  // Update school function
  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/schools/updateSchool/${state.id}`,
        data
      );
      Swal.fire({
        title: "School Updated!",
        text: "The school information has been successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/schools");
    } catch (err) {
      console.error("Error updating school:", err.message);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the school. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  // UseEffect
  useEffect(() => {
    if (state) {
      setValue("schoolName", state.schoolName);
      setValue("description", state.description);
      setValue("fees", state.fees);
      setValue("rate", state.rate);
    }
  }, [state]);


  return (
    <div className="update-school-page">
      <div className="container">
        <div className="update-school-form">
          <h2 className="form-title">Update School</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              Update School
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};



export default UpdateSchool;