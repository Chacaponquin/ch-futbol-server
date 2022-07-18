import { gql } from "apollo-server-core";

export const trainerSchema = gql`
  enum Gender {
    MALE
    FEMALE
  }

  type Trainer {
    _id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    image: String!
    country: String!
    gender: Gender!
  }

  type Query {
    getAllTrainers: [Trainer]!
    getFreeTrainers: [Trainer]!
  }

  type Mutations {
    createRandomTrainer: ID!
  }
`;

export const trainerResolvers = {
  Query: {
    getAllTrainers: () => [],
    getFreeTrainers: () => [],
  },
  Mutation: {
    createRandomPlayer: () => 3,
  },
};
