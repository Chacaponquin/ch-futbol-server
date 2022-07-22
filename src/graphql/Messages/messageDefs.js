import { gql } from "apollo-server-core";
import schemas from "../../db/schemas.js";
import User from "../../db/schemas/User.js";
import { messageReceptors } from "../../helpers/messageReceptor.js";
import { createMessage } from "../../helpers/tasks/message/createMessage.js";
import { createRandomMessage } from "../../helpers/tasks/message/createRandomMessage.js";
import { deleteMessages } from "../../helpers/tasks/message/deleteMessages.js";
import { getAllMessagesUser } from "../../helpers/tasks/message/getAllMessagesUser.js";
import { getPeopleToSendMessage } from "../../helpers/tasks/message/getPeopleToSendMessage.js";

export const messageSchema = gql`
  union OwnerElement = Player | Team | Trainer | User

  enum CreateMessageType {
    ${Object.values(messageReceptors)}
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

  type Message {
    content: String!
    from: OwnerElement!
    to: OwnerElement!
    _id: ID!
    title: String!
  }

  type Query {
    getAllMessagesUser: [Message]!
    getPeopleToSendMessage(elementID: ID): [OwnerElement]!
  }

  type Mutation {
    createRandomMessage(message: CreateRandomMessageInput!): Message!
    deleteMessages(messagesInf: DeleteMessagesInput!): Boolean!
    createMessage(message: CreateMessageInput!): Message!
  }
`;

export const messageResolvers = {
  Query: {
    getAllMessagesUser: (root, args, { currentUser }) =>
      getAllMessagesUser(currentUser),
    getPeopleToSendMessage: (root, { elementID }, { currentUser }) =>
      getPeopleToSendMessage(elementID, currentUser),
  },
  Mutation: {
    createRandomMessage: (root, args) => createRandomMessage(args.message),
    deleteMessages: (root, args) => deleteMessages(args.messagesInf),
    createMessage: (root, args, context) =>
      createMessage(args.message, context.currentUser),
  },
  OwnerElement: {
    __resolveType: (obj) => {
      const val = Object.values(schemas);
      for (let i = 0; i < val.length; i++) {
        if (obj instanceof val[i]) return val[i].modelName;
      }
    },
  },
};
