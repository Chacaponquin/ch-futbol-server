import { HttpQueryError } from "apollo-server-core";
import schemas from "../../../db/schemas.js";
import { filterType } from "../../messageReceptor.js";

//TODO: ARREGLAR LA DIFERENCIA ENTRE MENSAJES DE USUARIOS Y MENSAJE DE JUGADORES
export const getAllMessagesUser = async ({ _id, role }) => {
  try {
    const model = filterType(role);

    if (model) {
      const elementFound = await schemas[model]
        .findById(_id)
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
