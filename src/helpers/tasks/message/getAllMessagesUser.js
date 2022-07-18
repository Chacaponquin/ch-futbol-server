import { HttpQueryError } from "apollo-server-core";
import User from "../../../db/schemas/User.js";

export const getAllMessagesUser = async (userID) => {
  try {
    const userFound = await User.findById(userID);

    if (userFound) return userFound.messages;
    else throw new Error("No existe este usuario");
  } catch (error) {
    throw new HttpQueryError(404, "Hubo un error");
  }
};
