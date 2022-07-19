import { ApolloError } from "apollo-server-core";
import Trainer from "../../../db/schemas/Trainer.js";

export const getFreeTrainers = async () => {
  try {
    return await (await Trainer.find().limit(400))
      .filter((el) => el.freeToTransfer === true)
      .slice(0, 10);
  } catch (error) {
    throw new ApolloError("Hubo un error");
  }
};
