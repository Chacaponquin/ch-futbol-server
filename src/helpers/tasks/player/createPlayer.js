import { AuthenticationError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";

export const createPlayer = async (player) => {
  const { birth, pos, firstName, lastName, country, gender, imageUrl } = player;

  const newPlayer = new Player({
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
    throw new AuthenticationError(error.message);
  }
};
