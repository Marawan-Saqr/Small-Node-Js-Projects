const mongoose = require("mongoose");
const Joi = require("joi");



// Car Schema
const CarSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1886,
    max: new Date().getFullYear(),
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  color: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
}, { timestamps: true });

const Car = mongoose.model("Car", CarSchema);




// Validate Using Joi
function validateCreateCar(obj) {
  const schema = Joi.object({
    modelName: Joi.string().trim().min(3).max(200).required(),
    releaseYear: Joi.number().min(1886).max(new Date().getFullYear()).required(),
    nationality: Joi.string().trim().min(3).max(200).required(),
    color: Joi.string().trim().min(3).max(200).required(),
  });
  return schema.validate(obj);
}

function validateUpdateCar(obj) {
  const schema = Joi.object({
    modelName: Joi.string().trim().min(3).max(200),
    releaseYear: Joi.number().min(1886).max(new Date().getFullYear()),
    nationality: Joi.string().trim().min(3).max(200),
    color: Joi.string().trim().min(3).max(200),
  });
  return schema.validate(obj);
}



// Export Functions
module.exports = {
  Car,
  validateCreateCar,
  validateUpdateCar,
};