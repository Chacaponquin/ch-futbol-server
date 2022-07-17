import User from "../../../db/schemas/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError, ValidationError } from "apollo-server-core";
import { userCategorys } from "../../userRoles.js";

export const createUser = async ({
  username,
  password,
  email,
  image,
  role,
}) => {
  if (!/^[a-z]*[-._]?[a-z]*$/.test(password))
    throw new AuthenticationError("Mal patron para la contraseña");

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
    const doc = await newUser.save();
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_WORD);

    return { ...doc._doc, token };
  } catch (error) {
    if (error.name === "MongoServerError")
      throw new ValidationError("Ya existe ese usuario");
    else throw new ValidationError("Hubo un error");
  }
};
