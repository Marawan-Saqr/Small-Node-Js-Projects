const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Owner schema
const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  cars: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
});

// Create the Owner model
const Owner = mongoose.model('Owner', OwnerSchema);

// Validate the Owner object for creation
function validateCreateOwner(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(200).required(),
    email: Joi.string().email().trim().required(),
    phone: Joi.string().trim().required(),
    cars: Joi.string().required(),
  });
  return schema.validate(obj);
}

// Validate the Owner object for updates
function validateUpdateOwner(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(200),
    email: Joi.string().email().trim(),
    phone: Joi.string().trim(),
    cars: Joi.string(),
  });
  return schema.validate(obj);
}

// Export the model and validation functions
module.exports = {
  Owner,
  validateCreateOwner,
  validateUpdateOwner,
};