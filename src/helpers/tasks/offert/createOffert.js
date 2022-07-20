import PlayerOffert from "../../../db/schemas/Offerts/PlayerOffert.js";
import User from "../../../db/schemas/User.js";
import Player from "../../../db/schemas/Player.js";
import Trainer from "../../../db/schemas/Trainer.js";
import TrainerOffert from "../../../db/schemas/Offerts/TrainerOffert.js";
import { AuthenticationError, HttpQueryError } from "apollo-server-core";
import mongoose from "mongoose";

export const createOffert = async ({
  owner,
  to,
  salary,
  mount,
  type,
  team,
}) => {
  try {
    let returnID = [];

    for (let i = 0; i < to.length; i++) {
      returnID.push(
        await mainCreation(owner, to[i], salary, mount, type, team)
      );
    }

    return returnID;
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
};

const mainCreation = async (owner, to, salary, mount, type, team) => {
  await validateIsOwnerTeam(owner);

  let returnObject = null;

  switch (type) {
    case "PLAYER":
      returnObject = await createPlayerOffert(owner, to, salary, mount, team);
      break;

    case "TRAINER":
      returnObject = await createTrainerOffert(owner, to, salary, team);
      break;

    default:
      returnObject = null;
      break;
  }

  if (returnObject === null)
    throw new Error("Hubo un error en la creacion de la oferta");
  else return returnObject._id;
};

const validateIsOwnerTeam = async (id) => {
  const userFound = await User.findById(id);

  if (userFound) {
    if (!userFound.isAdmin)
      throw new AuthenticationError(
        "El usuario debe ser Dueño de un equipo para poder realizar ofertas"
      );
  } else throw new Error("No exitse el usuario");
};

const createPlayerOffert = async (owner, to, salary, mount, team) => {
  const newOffert = new PlayerOffert({
    owner,
    player: to,
    salary,
    mount,
    team,
  });

  await newOffert.save();
  await Player.updateOne({ _id: to }, { $push: { offerts: newOffert._id } });

  return newOffert;
};

const createTrainerOffert = async (owner, to, salary, team) => {
  const newOffert = new TrainerOffert({
    owner,
    trainer: to,
    salary,
    team,
  });

  await newOffert.save();
  await Trainer.updateOne({ _id: to }, { $push: { offerts: newOffert._id } });

  return newOffert;
};
