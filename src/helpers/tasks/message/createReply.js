import { HttpQueryError } from "apollo-server-core";
import Message from "../../../db/schemas/Message.js";

export const createReply = async (
  { content, messageID, from },
  { currentUser }
) => {
  try {
    const messageFound = await Message.findById(messageID);

    if (messageFound) {
      const { replys } = messageFound;

      if (replys.length === 0 && messageFound.from != from) {
        if (replys.length > 0 && replys[replys.length - 1].from != from) {
          const newReply = {
            content,
            from: currentUser._id,
            fromModel: currentUser.role,
          };

          await Message.findByIdAndUpdate(messageID, {
            $push: { replys: newReply },
          });

          return 1;
        } else {
          throw new Error("No puedes responder a tu propia respuesta");
        }
      } else {
        throw new Error("No puedes responder a un mensaje enviado por ti");
      }
    } else {
      throw new Error("No se encontro un mesaje con ese ID");
    }
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
};
