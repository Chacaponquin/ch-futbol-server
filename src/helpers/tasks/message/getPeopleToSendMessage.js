import { HttpQueryError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";
import Team from "../../../db/schemas/Teams.js";
import Trainer from "../../../db/schemas/Trainer.js";
import { getAllManagerElements } from "../../getAllManagerElements.js";
import { userRoles } from "../../userRoles.js";

export const getPeopleToSendMessage = async (
  elementID,
  { _id, role, isAdmin }
) => {
  try {
    if (isAdmin && !elementID) {
      const elementsOwner = await getAllManagerElements(_id);

      return elementsOwner;
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
        console.log(element.peopleToSendMessage);
      } else throw new Error("No existe ese elemento");
    } else throw new Error("Error en el paso de parametros");
  } catch (error) {
    console.log(error);
    throw new HttpQueryError(500, "Hubo un error");
  }
};
