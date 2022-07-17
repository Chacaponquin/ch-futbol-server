import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";
import User from "../../../db/schemas/User.js";

export const getUserByToken = async ({ token }) => {
  try {
    const user = jwt.verify(token);

    console.log(user);

    const userFound = await User.findById(user.id);

    return userFound;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw new AuthenticationError("El token a expirado");
    else {
      throw new AuthenticationError("Token incorrecto");
    }
  }
};
