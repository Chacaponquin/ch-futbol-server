import { HttpQueryError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";
import Teams from "../../../db/schemas/Teams.js";

export const fetchAllPlayers = async() => {
    try {
        const players = await Player.find().limit(20);

        for (let i = 0; i < players.length; i++) {
            if (players[i].actualTeam) {
                const team = await Teams.findById(players[i].actualTeam).select(
                    "image name"
                );

                players[i].actualTeamInf = team ? team : null;
            }
        }

        return players;
    } catch (error) {
        console.log(error);
        throw new HttpQueryError(error);
    }
};