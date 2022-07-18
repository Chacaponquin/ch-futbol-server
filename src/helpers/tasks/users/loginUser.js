import User from "../../../db/schemas/User.js";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-core";
import { registerToken } from "../../registerToken.js";

export const loginUser = async ({ email, password }) => {
  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      const isFine = await bcrypt.compare(password, userFound.password);

      if (isFine) return registerToken(userFound);
      else throw new Error("Usuario o contraseña incorrecta");
    } else throw new Error("Usuario o contraseña incorrecta");
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};
