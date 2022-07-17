import { gql } from "apollo-server-core";
import { createUser } from "../../helpers/tasks/users/createUser.js";
import { getUserByToken } from "../../helpers/tasks/users/getUserByToken.js";

export const userSchema = gql`
  input UserInput {
    username: String!
    password: String!
    email: String!
    image: String!
  }

  input UserTokenInput {
    token: String!
  }

  type User {
    _id: ID
    token: String!
    username: String!
    password: String!
    email: String!
    image: String!
  }

  type Query {
    allUsers: [User]!
    getUserByToken(token: UserTokenInput!): User!
  }

  type Mutation {
    createUser(user: UserInput!): User!
  }
`;

export const userResolvers = {
  Query: {
    allUsers: () => [],
    getUserByToken: (root, args) => getUserByToken(args.token),
  },

  Mutation: {
    createUser: (root, args) => createUser(args.user),
  },
};
