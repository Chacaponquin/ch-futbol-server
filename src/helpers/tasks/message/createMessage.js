import { HttpQueryError } from "apollo-server-core";
import schemas from "../../../db/schemas.js";
import Message from "../../../db/schemas/Message.js";
import { filterType } from "../../messageReceptor.js";

export const createMessage = async ({ content, to, title }, from) => {
  try {
    if (from) {
      if (from._id != to.id) {
        const newMessage = new Message({
          content,
          from: from._id,
          to: to.id,
          toModel: filterType(to.type),
          fromModel: filterType(from.role),
          title,
        });

        await newMessage.save();

        const model = filterType(to.type);
        if (model) {
          await schemas[model].updateOne(
            { _id: to.id },
            { $push: { messages: newMessage._id } }
          );
        }

        return newMessage._id;
      } else throw new Error("No se puede enviar un mensaje a uno mismo");
    } else throw new Error("Debe haber un usuario que envie el mensaje");
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
};
