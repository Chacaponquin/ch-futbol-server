import { gql } from "apollo-server-core";
import { createPlayer } from "../../helpers/tasks/player/createPlayer.js";
import { createRandomPlayer } from "../../helpers/tasks/player/createRandomPlayer.js";
import { deletePlayer } from "../../helpers/tasks/player/deletePlayer.js";
import { fetchAllPlayers } from "../../helpers/tasks/player/fetchAllPlayers.js";
import { fetchOwnPlayers } from "../../helpers/tasks/player/fetchOwnPlayers.js";
import { findFreePlayers } from "../../helpers/tasks/player/findFreePlayers.js";
import { transferPlayer } from "../../helpers/tasks/player/transferPlayer.js";

export const playerSchema = gql`
  enum Genders {
    MALE
    FEMALE
  }

  input TransferPlayerInput {
    teamFrom: String
    teamTo: String!
    player: String!
    price: Int
  }

  input PlayerInput {
    birth: String!
    pos: String!
    firstName: String!
    lastName: String!
    country: String!
    gender: String!
    imageUrl: String!
  }

  input FetchOwnPlayersInput {
    teamID: ID!
  }

  input DeletePlayerInput {
    players: [ID]!
  }

  type PlayerTeam {
    image: String
    name: String
  }

  type PlayerSeasonRecord {
    yearStart: Int
    yearFinish: Int
    minutes: Int
    assists: Int
    matchPlayed: Int
    goals: Int
  }

  type PlayerTotalStats {
    totalGoals: Int
    totalAssists: Int
  }

  type Player {
    _id: ID
    image: String
    fullName: String
    country: String
    gender: String
    position: String
    age: Int
    actualTeamInf: PlayerTeam
    actualPrice: Float
    totalStats: PlayerTotalStats
    seasonRecords: [PlayerSeasonRecord]!
  }

  type Query {
    findFreePlayers: [Player]!
    fetchOwnPlayers(team: FetchOwnPlayersInput!): [Player]!
    fetchAllPlayers: [Player]!
  }

  type Mutation {
    createRandomPlayer: Player!
    transferPlayer(data: TransferPlayerInput!): ID!
    createPlayer(player: PlayerInput!): ID!
    deletePlayer(players: DeletePlayerInput!): ID!
  }
`;

export const playerResolver = {
  Query: {
    findFreePlayers: () => findFreePlayers(),
    fetchOwnPlayers: (root, args) => fetchOwnPlayers(args.team),
    fetchAllPlayers: () => fetchAllPlayers(),
  },
  Mutation: {
    createRandomPlayer: () => createRandomPlayer(),
    createPlayer: (root, args) => createPlayer(args.player),
    transferPlayer: (root, args) => transferPlayer(args.data),
    deletePlayer: (root, args) => deletePlayer(args.players),
  },
};
