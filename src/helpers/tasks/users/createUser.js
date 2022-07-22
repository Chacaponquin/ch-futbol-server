import User from "../../../db/schemas/User.js";
import bcrypt from "bcrypt";
import { ValidationError } from "apollo-server-core";
import { userCategorys } from "../../userRoles.js";
import { registerToken } from "../../registerToken.js";

export const createUser = async ({
  username,
  password,
  email,
  image,
  role,
}) => {
  /*if (!/^[a-z]*[-._]?[a-z]*$/.test(password))
    throw new AuthenticationError("Mal patron para la contraseña");
*/
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashPassword,
    email,
    image,
    category: userCategorys.CURRENT_USER,
    role,
  });

  try {
    return await registerToken(newUser);
  } catch (error) {
    console.log(error);
    if (error.name === "MongoServerError")
      throw new ValidationError("Ya existe ese usuario");
    else throw new ValidationError("Hubo un error");
  }
};
