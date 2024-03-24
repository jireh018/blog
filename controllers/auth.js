const { User, validateUser } = require("../models/user");

const register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  console.log(user, req.body);
  await user.save();
  res.status(201).json(user);
};

module.exports = {
  register,
};
