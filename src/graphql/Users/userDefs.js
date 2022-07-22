import { gql } from "apollo-server-core";
import { createUser } from "../../helpers/tasks/users/createUser.js";
import { getUserByToken } from "../../helpers/tasks/users/getUserByToken.js";
import { loginUser } from "../../helpers/tasks/users/loginUser.js";
import { userRoles } from "../../helpers/userRoles.js";

export const userSchema = gql`
  union OwnerElement = Player | Team | Trainer

  enum UserRoles{
    ${Object.values(userRoles)}
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

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
    email: String!
    image: String!
    role: String!
    category: String!
    isAdmin: Boolean!
    elementsOwner: [OwnerElement]!
  }

  type Query {
    allUsers: [User]!
    getUserByToken(token: String): User!
    loginUser(user: LoginUserInput!): User!
  }

  type Mutation {
    createUser(user: UserInput!): User!
  }
`;

export const userResolvers = {
  Query: {
    allUsers: () => [],
    getUserByToken: (root, args, context) => getUserByToken(context),
    loginUser: (root, args) => loginUser(args.user),
  },

  Mutation: {
    createUser: (root, args) => createUser(args.user),
  },
};
