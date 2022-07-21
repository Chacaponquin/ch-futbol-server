import { HttpQueryError } from "apollo-server-core";
import schemas from "../../../db/schemas.js";
import Message from "../../../db/schemas/Message.js";
import { filterType } from "../../messageReceptor.js";

export const createMessage = async ({ content, from, to, title }) => {
  try {
    const newMessage = new Message({
      content,
      from: from.id,
      to: to.id,
      toModel: filterType(to.type),
      fromModel: filterType(from.type),
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

    return newMessage;
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
};
