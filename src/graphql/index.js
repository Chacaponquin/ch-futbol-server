import { blogResolver, blogSchema } from "./Blog/blogDefs.js";
import { leagueResolvers, leagueSchema } from "./Leagues/leagueDefs.js";
import { messageResolvers, messageSchema } from "./Messages/messageDefs.js";
import { playerResolver, playerSchema } from "./Players/playerDefs.js";
import { teamResolver, teamSchema } from "./Teams/teamsDefs.js";
import { trainerResolvers, trainerSchema } from "./Trainer/trainerDefs.js";
import { userResolvers, userSchema } from "./Users/userDefs.js";

export const typeDefs = [
  userSchema,
  playerSchema,
  teamSchema,
  leagueSchema,
  blogSchema,
  trainerSchema,
  messageSchema,
];
export const resolvers = [
  userResolvers,
  playerResolver,
  teamResolver,
  leagueResolvers,
  blogResolver,
  trainerResolvers,
  messageResolvers,
];
