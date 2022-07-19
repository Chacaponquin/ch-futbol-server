import { gql } from "apollo-server-core";
import { createRandomMessage } from "../../helpers/tasks/message/createRandomMessage.js";
import { deleteMessages } from "../../helpers/tasks/message/deleteMessages.js";
import { getAllMessagesUser } from "../../helpers/tasks/message/getAllMessagesUser.js";

export const messageSchema = gql`
  input CreateRandomMessageInput {
    from: ID!
    to: ID!
  }

  input DeleteMessagesInput {
    userID: ID!
    messages: [ID]!
  }

  input CreateMessageInput {
    content: String!
    from: ID!
    to: ID!
  }

  type Message {
    content: String!
    from: User!
    to: User!
    _id: ID!
    title: String!
  }

  type Query {
    getAllMessagesUser(userID: ID!): [Message]!
  }

  type Mutation {
    createRandomMessage(message: CreateRandomMessageInput!): Message!
    deleteMessages(messagesInf: DeleteMessagesInput!): Boolean!
  }
`;

export const messageResolvers = {
  Query: {
    getAllMessagesUser: (root, args) => getAllMessagesUser(args.userID),
  },
  Mutation: {
    createRandomMessage: (root, args) => createRandomMessage(args.message),
    deleteMessages: (root, args) => deleteMessages(args.messagesInf),
  },
};
