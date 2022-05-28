import League from "../../../db/schemas/League.js";
import { AuthenticationError } from "apollo-server-core";

export const createLeague = async({ league }) => {
    const { name, country } = league;

    const newLeague = new League({
        name,
        country,
    });

    try {
        await newLeague.save();

        return newLeague;
    } catch (error) {
        throw new AuthenticationError(error);
    }
};