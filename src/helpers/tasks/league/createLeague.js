import League from "../../../db/schemas/League.js";
import { validateIsAdmin } from "../../validateIsAdmin.js";

export const createLeague = async (
  { name, country, teamMax },
  { currentUser }
) => {
  try {
    validateIsAdmin(currentUser);

    const newLeague = new League({
      name,
      country,
      maxCantTeams: teamMax,
    });

    await newLeague.save();

    return newLeague._id;
  } catch (error) {
    throw error;
  }
};
