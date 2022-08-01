import { gql } from "apollo-server-core";
import mongoose from "mongoose";
import { createMessage } from "../../helpers/tasks/message/createMessage.js";
import { createRandomMessage } from "../../helpers/tasks/message/createRandomMessage.js";
import { createReply } from "../../helpers/tasks/message/createReply.js";
import { deleteMessages } from "../../helpers/tasks/message/deleteMessages.js";
import { getAllMessagesUser } from "../../helpers/tasks/message/getAllMessagesUser.js";
import { getPeopleToSendMessage } from "../../helpers/tasks/message/getPeopleToSendMessage.js";
import { userRoles } from "../../helpers/userRoles.js";

export const messageSchema = gql`
  union OwnerElement = Player | Team | Trainer | User

  enum CreateMessageType {
    ${Object.values(userRoles)}
  }

  input ElementInput {
    id: ID!
    type: String!
  }

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
    to: ElementInput!
    title: String!
  }

  input CreateReplyInput {
    content: String!
    messageID: ID!
    from: ID!
  }

  type Message {
    content: String!
    from: OwnerElement!
    to: OwnerElement!
    _id: ID!
    title: String!
    peopleWhoSee: [ID!]!
    replys: [Reply!]!
  }

  type Reply {
    content: String!
    from: OwnerElement!
    peopleWhoSee: [ID!]!
  }

  type Query {
    getAllMessagesUser(elementID: ID): [Message!]!
    getPeopleToSendMessage(elementID: ID): [OwnerElement!]!
  }

  type Mutation {
    createRandomMessage(message: CreateRandomMessageInput!): ID!
    deleteMessages(messagesInf: DeleteMessagesInput!): Boolean!
    createMessage(message: CreateMessageInput!): Message!
    createReply(reply: CreateReplyInput!): ID!
  }
`;

export const messageResolvers = {
  Query: {
    getAllMessagesUser: (root, args, { currentUser }) =>
      getAllMessagesUser(args.elementID, currentUser),
    getPeopleToSendMessage: (root, { elementID }, { currentUser }) =>
      getPeopleToSendMessage(elementID, currentUser),
  },
  Mutation: {
    createRandomMessage: (root, args) => createRandomMessage(args.message),
    deleteMessages: (root, args) => deleteMessages(args.messagesInf),
    createMessage: (root, args, context) =>
      createMessage(args.message, context.currentUser),
    createReply: (root, args, context) => createReply(args.reply, context),
  },
  OwnerElement: {
    __resolveType: (obj) => {
      const models = Object.values(mongoose.connection.models);

      for (let i = 0; i < models.length; i++) {
        if (obj instanceof models[i]) return models[i].modelName;
      }
    },
  },
};
