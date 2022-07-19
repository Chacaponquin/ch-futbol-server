import { faker } from "@faker-js/faker";
import { HttpQueryError } from "apollo-server-core";
import Message from "../../../db/schemas/Message.js";
import User from "../../../db/schemas/User.js";

export const createRandomMessage = async ({ from, to }) => {
  const newMessage = new Message({
    from,
    to,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
  });

  try {
    await newMessage.save();
    await User.updateOne({ _id: to }, { $push: { messages: newMessage._id } });

    return newMessage;
  } catch (error) {
    console.log(error);
    throw new HttpQueryError(500, "Hubo un error en la creacion del mensaje");
  }
};
