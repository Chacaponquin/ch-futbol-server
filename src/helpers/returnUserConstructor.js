import Player from "../db/schemas/Player.js";
import Team from "../db/schemas/Teams.js";
import Trainer from "../db/schemas/Trainer.js";
import { userRoles } from "./userRoles.js";

export const returnUserConstructor = async (user) => {
  const { isAdmin, username, image, email, role, _id } = user;
  let elementsOwner = [];

  if (role == userRoles.MANAGER) elementsOwner = [];
  else if (role == userRoles.PLAYER) {
    elementsOwner = await Player.find({ createdBy: _id });
  } else if (role == userRoles.CLUB_OWNER) {
    elementsOwner = await Team.find({ createdBy: _id });
  } else if (role == userRoles.TRAINER) {
    elementsOwner = await Trainer.find({ createdBy: _id });
  }

  return { isAdmin, username, image, email, role, _id, elementsOwner };
};
