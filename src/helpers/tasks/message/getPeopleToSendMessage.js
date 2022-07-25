import { HttpQueryError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";
import Team from "../../../db/schemas/Teams.js";
import Trainer from "../../../db/schemas/Trainer.js";
import { userRoles } from "../../userRoles.js";
import User from "../../../db/schemas/User.js";

export const getPeopleToSendMessage = async (elementID, currentUser) => {
  try {
    if (!elementID) {
      const people = await currentUser.peopleToSendMessage();

      return people;
    } else if (elementID) {
      let element = null;

      if (role === userRoles.PLAYER) {
        element = await Player.findOne({ _id: elementID });
      } else if (role === userRoles.TRAINER) {
        element = await Trainer.findOne({ _id: elementID });
      } else if (role === userRoles.CLUB_OWNER) {
        element = await Team.findOne({ _id: elementID });
      }

      if (element) {
        const people = await element.peopleToSendMessage();

        return people;
      } else throw new Error("No existe ese elemento");
    } else throw new Error("Error en el paso de parametros");
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
};
