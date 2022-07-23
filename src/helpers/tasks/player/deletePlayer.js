import { ApolloError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";

export const deletePlayer = async (players) => {
  try {
    for (let i = 0; i < players.length; i++) {
      await Player.findByIdAndDelete(players[i]);
    }

    return 1;
  } catch (error) {
    throw new ApolloError("Hubo un error en la eliminacion de los jugadores");
  }
};
