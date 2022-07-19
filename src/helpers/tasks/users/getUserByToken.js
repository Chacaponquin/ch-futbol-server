import jwt from "jsonwebtoken";
import { AuthenticationError, HttpQueryError } from "apollo-server-core";
import User from "../../../db/schemas/User.js";

export const getUserByToken = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.SECRET_WORD);
      const userFound = await User.findOne({ _id: user.id });

      if (!userFound) throw new HttpQueryError(404, "Token incorrecto");
      else return userFound;
    } else throw new HttpQueryError(400, "No se ha pasado un token");
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw new HttpQueryError(401, "El token ha expirado");
    else {
      throw error;
    }
  }
};
