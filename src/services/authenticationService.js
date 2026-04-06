import { findUserByemail, findUserById, getUsers } from "../dao/userDAO.js";
import User from "../models/User.js";
import { DIMessage, ErrorMessage, SuccessMessage } from "../utils/error.js";
import { compareHashedPassword, hashPassword } from "../utils/hashing.js";
import { signToken, verifyToken } from "../utils/jwtoken.js";

const login = async (email, password) => {
  const user = await findUserByemail(email);
  console.log("USER:::::", user);

  if (!user) {
    // Error
    return new DIMessage().message(new ErrorMessage(400, "Bad credentials"));
  }
  // Compare between hash pass & current pass.
  const isEqual = await compareHashedPassword(password, user.password);
  if (!isEqual) {
    // Error
    return new DIMessage().message(
      new ErrorMessage(400, "Email or password wrong"),
    );
  } else {
    const payload = {
      email: user.email,
      name: user.name,
      id: user._id,
      role: user.role,
    };
    const token = signToken(payload);
    const data = {
      user,
      accessToken: token,
    };
    // Success
    return new DIMessage().message(new SuccessMessage(201, "Success", data));
  }
};

const register = async (name, email, password, passwordConfirmation, role) => {
  const user = await findUserByemail(email);
  if (user) {
    return new DIMessage().message(
      new ErrorMessage(400, "User already existed"),
    );
  } else {
    if (password != passwordConfirmation) {
      return new DIMessage().message(
        new ErrorMessage(402, "Entre the same password are not similaire"),
      );
    } else {
      // Hash password &  Create user & return result
      //1 - Hash the password:
      const hashedPassword = await hashPassword(password);
      //1 - Create user:
      const createUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });
      // 3- return result.
      return new DIMessage().message(
        new SuccessMessage(201, "Success", createUser),
      );
    }
  }
};

export { login, register };
