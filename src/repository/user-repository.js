const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models/index");
const ClientError = require("../utils/errors/client-error");
const AppErrors = require("../utils/errors/error-handler");
const ValidationError = require("../utils/errors/validation-error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        // console.log("Creating new validation error");
        // const validationError = new ValidationError(error);
        // console.log("SequelizeValidationError:", validationError);

        if (error.name === "SequelizeValidationError") {
          throw new ValidationError(error);
        }
      }

      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw { error };
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.error("Something went wrong on repository layer:", error);
      throw new Error(error.message || "Failed to fetch user by ID");
    }
  }

  // async getUserByEmail(userEmail) {
  //   try {
  //     const user = await User.findOne({
  //       where: {
  //         email: userEmail,
  //       },
  //     });
  //     console.log(user);
  //     if (!user) {
  //       throw new ClientError(
  //         "AttributeNotFound",
  //         "Invalid email sent in the request",
  //         "Please check the email as their is no recored of this email",
  //         StatusCodes.NOT_FOUND
  //       );
  //     }
  //     return user;
  //   } catch (error) {
  //     console.log(error);

  //     console.log("Something went wrong on repository layer");
  //     throw { error };
  //   }
  // }
  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: { email: userEmail },
      });

      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email sent in the request",
          "Please check the email as there is no record of this email",
          StatusCodes.NOT_FOUND
        );
      }

      return user;
    } catch (error) {
      console.error("Error in getUserByEmail:", error);
      throw error; // preserve original error for upper layer
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw { error };
    }
  }
}

module.exports = UserRepository;
