import { HttpQueryError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";
import User from "../../../db/schemas/User.js";
import { userCategorys } from "../../userRoles.js";

export const createPlayer = async (
  { birth, pos, firstName, lastName, country, gender, imageUrl },
  { _id }
) => {
  try {
    await validateNoRepeatPlayer(createdBy);

    const newPlayer = new Player({
      createdBy: _id,
      firstName,
      lastName,
      country,
      birthDate: birth,
      position: pos,
      gender,
      image: imageUrl,
    });

    await newPlayer.save();

    return newPlayer._id;
  } catch (error) {
    console.log(error);
    if (error.name === "MongoServerError")
      throw new HttpQueryError(504, "Ya existe ese usuario");
    else throw new HttpQueryError(500, error.message);
  }
};

//FUNCION PARA VALIDAR QUE UN USUARIO PUEDE TENER MAS DE UN JUGADOR CREADO POR EL
const validateNoRepeatPlayer = async (id) => {
  const userFound = await User.findById(id);

  if (userFound) {
    if (userFound.category == userCategorys.CURRENT_USER) {
      throw new Error(
        "El usuario no puede crear mas de un elemento debido a que no es Manager"
      );
    }
  } else throw new Error("No existe el usuario creador");
};
