import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateNote = () => {

  // Component States
  const { state } = useLocation();
  const navigate = useNavigate();


  // Zod Schema for Validation
  const todoSchema = z.object({
    title: z
      .string()
      .nonempty("Title is required")
      .min(3, "Title must be at least 3 characters long")
      .max(50, "Title cannot exceed 50 characters"),
    description: z
      .string()
      .nonempty("Description is required")
      .min(5, "Description must be at least 5 characters long")
      .max(200, "Description cannot exceed 200 characters"),
  });


  // React Hook Form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'onTouched', resolver: zodResolver(todoSchema)});


  // Update task Function
  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:9000/updateTask/${state.id}`, data);
      Swal.fire({
        title: "Task Updated!",
        text: "Your task has been successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/todo");
    } catch (err) {
      console.error("Error updating task:", err.message);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating your task. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  // UseEffect
  useEffect(() => {
    if (state) {
      setValue("title", state.title);
      setValue("description", state.description);
    }
  }, [state]);


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Update Todo</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Title Field */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                isInvalid={!!errors.title}
                {...register("title")}
              />
              {errors.title && (
                <Form.Control.Feedback type="invalid">
                  {errors.title.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Description Field */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                isInvalid={!!errors.description}
                {...register("description")}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="w-100">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateNote;