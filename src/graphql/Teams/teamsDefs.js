import { gql } from "apollo-server-core";
import { createTeam } from "../../helpers/tasks/teams/createTeam.js";

export const teamSchema = gql`
  input TeamInput {
    name: String!
    league: String!
  }

  type Team {
    _id: ID!
    league: String!
    foundationYear: Int!
    name: String!
    image: String!
  }

  type Mutation {
    createTeam(team: TeamInput!): ID!
  }
`;

export const teamResolver = {
  Mutation: {
    createTeam: (root, args, context) =>
      createTeam(args.team, context.currentUser),
  },
};
