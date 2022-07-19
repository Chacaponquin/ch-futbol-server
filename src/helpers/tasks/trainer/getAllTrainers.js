import { ApolloError } from "apollo-server-core";
import Trainer from "../../../db/schemas/Trainer.js";

export const getAllTrainers = async () => {
  try {
    return await Trainer.find();
  } catch (error) {
    throw new ApolloError("Hubo un error");
  }
};
