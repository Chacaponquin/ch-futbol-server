import League from "../../../db/schemas/League.js";
import { HttpQueryError } from "apollo-server-core";

export const findAvailibleLeagues = async () => {
  try {
    return await (
      await League.find()
    ).filter((el) => el.availibleForTeams === true);
  } catch (error) {
    throw new HttpQueryError(500, "Hubo un error en la busqueda de ligas");
  }
};
