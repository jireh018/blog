const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.status(201).json(user);
};

module.exports = {
  register,
};
