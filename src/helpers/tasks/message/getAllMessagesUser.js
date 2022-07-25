import { HttpQueryError } from "apollo-server-core";
import schemas from "../../../db/schemas.js";
import User from "../../../db/schemas/User.js";
import { filterType } from "../../messageReceptor.js";

//TODO: ARREGLAR LA DIFERENCIA ENTRE MENSAJES DE USUARIOS Y MENSAJE DE JUGADORES
export const getAllMessagesUser = async (elementID, { _id, role }) => {
  try {
    if (elementID) {
      const model = filterType(role);

      if (model) {
        const elementFound = await schemas[model]
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
      } else throw new Error("El tipo insertado no es válido");
    } else {
      const user = await User.findById(_id).populate("messages");

      let messages = [];

      for (let i = 0; i < user.messages.length; i++) {
        const completeMessage = await user.messages[i].populate("to from");
        if (completeMessage) messages.push(completeMessage);
      }

      return messages;
    }
  } catch (error) {
    throw new HttpQueryError(404, error.message);
  }
};
