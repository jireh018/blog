const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(5)
      .max(255)
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(5)
      .max(1024)
      .required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateUser,
};
