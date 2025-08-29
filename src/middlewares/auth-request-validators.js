const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing in the  request",
    });
  }
  next();
};

const ValidateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return req.status(400).json({
      success: false,
      data: {},
      message: "User id not given",
      err: "Something went wrong",
    });
  }
  next();
};
module.exports = {
  validateUserAuth,
  ValidateIsAdminRequest,
};
