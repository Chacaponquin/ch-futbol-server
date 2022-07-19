import { ApolloError } from "apollo-server-core";
import User from "../../../db/schemas/User.js";

export const deleteMessages = async ({ userID, messages }) => {
  try {
    for (let i = 0; i < messages.length; i++) {
      await User.updateOne(
        { _id: userID },
        { $pull: { messages: messages[i] } }
      );
    }
  } catch (error) {
    throw new ApolloError("Hubo un error al eliminar");
  }

  return true;
};
