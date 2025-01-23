const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose schema
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  grade: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
}, {
  timestamps: true
});

// Mongoose model
const Student = mongoose.model("Student", studentSchema);

// Joi validation for creating a student
function validateCreateStudent(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(3).max(200).required(),
    grade: Joi.number().min(0).max(10).required(),
  });
  return schema.validate(obj);
}

// Joi validation for updating a student
function validateUpdateStudent(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(3).max(200),
    grade: Joi.number().min(0).max(10),
  });
  return schema.validate(obj);
}

module.exports = {
  Student,
  validateCreateStudent,
  validateUpdateStudent
};