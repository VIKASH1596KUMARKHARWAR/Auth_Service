const express = require("express");

const UserController = require("../../controllers/user-controller");
const { AuthRequestValidator } = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  UserController.create
);

router.post(
  "/signIn",
  AuthRequestValidator.validateUserAuth,
  UserController.signIn
);

router.get("/isAuthenticated", UserController.isAuthenticated);

router.get(
  "/isAdmin",
  AuthRequestValidator.ValidateIsAdminRequest,
  UserController.isAdmin
);

module.exports = router;
