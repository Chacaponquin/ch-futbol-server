import { gql } from "apollo-server-core";
import { getAllMessagesUser } from "../../helpers/tasks/message/getAllMessagesUser.js";

export const messageSchema = gql`
  input CreateRandomMessageInput {
    from: ID!
    to: ID!
  }

  input CreateMessageInput {
    content: String!
    from: ID!
    to: ID!
  }

  type Message {
    content: String!
    from: String!
    to: String!
  }

  type Query {
    getAllMessagesUser(userID: ID!): [Message]!
  }

  type Mutation {
    createRandomMessage(message: CreateRandomMessageInput!): Message!
  }
`;

export const messageResolvers = {
  Query: {
    getAllMessagesUser: (root, args) => getAllMessagesUser(args.userID),
  },
};
