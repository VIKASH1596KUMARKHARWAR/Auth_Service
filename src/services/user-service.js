const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.UserRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service ;layer");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("omething went wrong in token creation");
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("SOmething went wrong in token validation", error);
    }
  }

  checkPassword(userInputPlainPassword, encryptedPaasword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPaasword);
    } catch (error) {
      console.log("Something went wrong in password comparision");
    }
  }
}
module.exports = UserService;
