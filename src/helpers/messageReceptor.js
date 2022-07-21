import { userRoles } from "./userRoles.js";

export const messageReceptors = {
  USER: "User",
  TRAINER: "Trainer",
  CLUB_OWNER: "Team",
  PLAYER: "Player",
};

//FUNCION PARA DEVILVER EL MODELO DE REFERIA PARA LAS BUSQUEDAS
export const filterType = (type) => {
  let returnObj = null;

  if (type == userRoles.PLAYER) returnObj = messageReceptors.PLAYER;
  else if (type == userRoles.CLUB_OWNER) returnObj = messageReceptors.USER;
  else if (type == userRoles.TRAINER) returnObj = messageReceptors.TRAINER;
  else if (type == messageReceptors.USER) returnObj = messageReceptors.USER;

  return returnObj;
};
