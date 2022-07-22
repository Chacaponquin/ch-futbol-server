import Player from "../db/schemas/Player.js";
import Team from "../db/schemas/Teams.js";
import Trainer from "../db/schemas/Trainer.js";

export const getAllManagerElements = async (id) => {
  let resultArray = [];

  const models = [Trainer, Team, Player];

  try {
    for (let i = 0; i < models.length; i++) {
      const result = await models[i].find({ createdBy: id });
      resultArray = [...resultArray, ...result];
    }

    return resultArray;
  } catch (error) {
    throw error;
  }
};
