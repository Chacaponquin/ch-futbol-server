import { ApolloError } from "apollo-server-core";
import League from "../../../db/schemas/League.js";

export const getAllLeagues = async () => {
  try {
    return await (await League.find().limit(30)).slice(0, 16);
  } catch (error) {
    throw new ApolloError("Hubo un error al obtener las ligas");
  }
};
