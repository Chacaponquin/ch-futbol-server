import { HttpQueryError } from "apollo-server-core";
import User from "../../../db/schemas/User.js";

export const getAllMessagesUser = async (userID) => {
  try {
    const userFound = await User.findById(userID).populate("messages");

    let returnMessages = [];
    if (userFound) {
      for (let i = 0; i < userFound.messages.length; i++) {
        const completeMessage = await userFound.messages[i].populate("to from");
        if (completeMessage) returnMessages.push(completeMessage);
      }

      return returnMessages;
    } else throw new Error("No existe este usuario");
  } catch (error) {
    console.log(error);
    throw new HttpQueryError(404, "Hubo un error");
  }
};
