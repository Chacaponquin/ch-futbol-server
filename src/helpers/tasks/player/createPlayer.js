import { AuthenticationError, HttpQueryError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";

export const createPlayer = async ({
  birth,
  pos,
  firstName,
  lastName,
  country,
  gender,
  imageUrl,
  createdBy,
}) => {
  const newPlayer = new Player({
    createdBy,
    firstName,
    lastName,
    country,
    birthDate: birth,
    position: pos,
    gender,
    image: imageUrl,
  });

  try {
    await newPlayer.save();

    return newPlayer._id;
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
};
