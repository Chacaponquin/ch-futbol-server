import User from "../../../db/schemas/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError, ValidationError } from "apollo-server-core";
import { userRoles } from "../../userRoles.js";
import mongoose from "mongoose";

export const createUser = async ({ username, password, email, image }) => {
  if (!/^[a-z]*[-._]?[a-z]*$/.test(password))
    throw new AuthenticationError("Mal patron para la contraseña");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashPassword,
    email,
    image,
    role: userRoles.CURRENT_USER,
  });

  try {
    const doc = await newUser.save();
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.SECRET_WORD
    );

    return { ...doc._doc, token };
  } catch (error) {
    console.log(error);
    if (error.name === "MongoServerError")
      throw new ValidationError("Ya existe ese usuario");
    throw new AuthenticationError("Hubo un error");
  }
};
