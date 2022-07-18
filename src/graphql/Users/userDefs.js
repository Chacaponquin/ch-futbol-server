import { gql } from "apollo-server-core";
import { createUser } from "../../helpers/tasks/users/createUser.js";
import { getUserByToken } from "../../helpers/tasks/users/getUserByToken.js";

export const userSchema = gql`
  input UserInput {
    username: String!
    password: String!
    email: String!
    image: String!
    role: String!
  }

  type User {
    _id: ID
    token: String!
    username: String!
    password: String!
    email: String!
    image: String!
    role: String!
    category: String!
    isAdmin: Boolean!
  }

  type Query {
    allUsers: [User]!
    getUserByToken(token: String!): User!
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
