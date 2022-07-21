import { HttpQueryError } from "apollo-server-core";
import schemas from "../../../db/schemas.js";
import { filterType } from "../../messageReceptor.js";

export const getAllMessagesUser = async ({ id, type }) => {
  try {
    const model = filterType(type);

    if (model) {
      const elementFound = await schemas[model]
        .findById(id)
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
      } else throw new Error("No existe este usuario");
    } else throw new Error("El tipo insertado no es válido");
  } catch (error) {
    throw new HttpQueryError(404, error.message);
  }
};
