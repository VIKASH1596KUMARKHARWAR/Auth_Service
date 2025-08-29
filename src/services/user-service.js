const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service ;layer");
      throw { error };
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step:1-> fetch the user using the email
      const user = await this.userRepository.getUserByEmail(email);

      //step2 :-> compare incomming password with the stores encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect Password" };
      }

      //step3-> if password match then create a token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the signIn process");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }

      const user = this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exist" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the signIn process");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("omething went wrong in token creation");
      throw { error };
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
      throw { error };
    }
  }
}
module.exports = UserService;
