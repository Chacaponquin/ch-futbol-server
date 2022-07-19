import PlayerOffert from "../../../db/schemas/Offerts/PlayerOffert.js";
import User from "../../../db/schemas/User.js";
import Player from "../../../db/schemas/Player.js";
import Trainer from "../../../db/schemas/Trainer.js";
import TrainerOffert from "../../../db/schemas/Offerts/TrainerOffert.js";
import { AuthenticationError, HttpQueryError } from "apollo-server-core";
import mongoose from "mongoose";

export const createOffert = async ({ owner, to, salary, mount, type }) => {
  try {
    if (
      mongoose.Types.ObjectId.isValid(owner) &&
      mongoose.Types.ObjectId.isValid(to)
    ) {
      await validateIsOwnerTeam(owner);

      let returnObject = null;

      switch (type) {
        case "PLAYER":
          returnObject = await createPlayerOffert(owner, to, salary, mount);
          break;

        case "TRAINER":
          returnObject = await createTrainerOffert(owner, to, salary);
          break;

        default:
          returnObject = null;
          break;
      }

      if (returnObject === null)
        throw new Error("Hubo un error en la creacion de la oferta");
      else return returnObject._id;
    } else throw new Error("Se debe insertar un ID válido");
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
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

const createPlayerOffert = async (owner, to, salary, mount) => {
  const newOffert = new PlayerOffert({
    owner,
    player: to,
    salary,
    mount,
  });

  await newOffert.save();
  await Player.updateOne({ _id: to }, { $push: { offerts: newOffert._id } });

  return newOffert;
};

const createTrainerOffert = async (owner, to, salary) => {
  const newOffert = new TrainerOffert({
    owner,
    trainer: to,
    salary,
  });

  await newOffert.save();
  await Trainer.updateOne(to, { $push: { offerts: newOffert._id } });

  return newOffert;
};
