const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
      error: {},
    });
  } catch (error) {
    console.log("Something went on the controller layer");
    return res.status(500).json({
      message: "Somethign went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
};
