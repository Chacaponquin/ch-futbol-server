import { HttpQueryError } from "apollo-server-core";
import mongoose from "mongoose";
import User from "../../../db/schemas/User.js";
import { filterType } from "../../messageReceptor.js";

export const getAllMessagesUser = async (elementID, { _id, role }) => {
  try {
    if (elementID) {
      const elementFound = await mongoose
        .model(filterType(role))
        .findById(elementID)
        .populate("messages");

      let returnMessages = [];
      if (elementFound) {
        for (let i = 0; i < elementFound.messages.length; i++) {
          const completeMessage = await elementFound.messages[i].populate(
            "to from"
          );
          if (completeMessage) returnMessages.push(completeMessage);
        }

        return returnMessages;
      } else throw new Error("No existe este elemento");
    } else {
      const user = await User.findById(_id).populate([
        {
          path: "messages",
          populate: "to from replys.from",
        },
      ]);

      return user.messages;
    }
  } catch (error) {
    throw new HttpQueryError(404, error.message);
  }
};
