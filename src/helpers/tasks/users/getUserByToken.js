import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";
import User from "../../../db/schemas/User.js";

export const getUserByToken = async (token) => {
  try {
    const user = jwt.verify(token, process.env.SECRET_WORD);
    const userFound = await User.findOne({ _id: user.id });
    return userFound;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw new AuthenticationError("El token a expirado");
    else {
      throw new AuthenticationError("Token incorrecto");
    }
  }
};
