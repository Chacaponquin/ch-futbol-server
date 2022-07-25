import User from "../../../db/schemas/User.js";
import Player from "../../../db/schemas/Player.js";
import Trainer from "../../../db/schemas/Trainer.js";
import { AuthenticationError, HttpQueryError } from "apollo-server-core";
import Offert from "../../../db/schemas/Offert.js";
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

    await validateIsOwnerTeam(owner);

    for (let i = 0; i < to.length; i++) {
      const newOffert = new Offert({
        owner,
        element: to[i],
        elementType: type,
        mount,
        salary,
        team,
      });

      await newOffert.save();

      mongoose
        .model(type)
        .updateOne({ _id: to }, { $push: { offerts: newOffert._id } });

      returnID.push(newOffert._id);
    }

    return returnID;
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
