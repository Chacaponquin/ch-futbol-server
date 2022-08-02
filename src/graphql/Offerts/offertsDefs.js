import { gql } from "apollo-server-core";
import { createOffert } from "../../helpers/tasks/offert/createOffert.js";
import { getOffertsById } from "../../helpers/tasks/offert/getOffertsById.js";

export const offertsSchema = gql`
  enum TypeOffert {
    Player
    Trainer
  }

  union ElementsOffertUnion = Player | Trainer

  input CreateOffertInput {
    owner: ID!
    to: [ID!]!
    salary: Float
    mount: Float
    team: ID!
    type: TypeOffert!
  }

  interface Offert {
    _id: ID!
    owner: User!
    accepted: Boolean!
    salary: Float!
    team: Team!
    mount: Float!
    element: ElementsOffertUnion
  }

  type Query {
    getOffertsById(elementID: ID!): [Offert!]!
  }

  type Mutation {
    createOffert(offert: CreateOffertInput!): [ID!]!
  }
`;

export const offertsResolvers = {
  Query: {
    getOffertsById: (root, { elementID }, { currentUser }) =>
      getOffertsById(elementID, currentUser),
  },
  Mutation: {
    createOffert: (root, args) => createOffert(args.offert),
  },
};
