import { gql } from "apollo-server-core";
import { createRandomTrainer } from "../../helpers/tasks/trainer/createRandomTrainer.js";
import { getAllTrainers } from "../../helpers/tasks/trainer/getAllTrainers.js";
import { getFreeTrainers } from "../../helpers/tasks/trainer/getFreeTrainers.js";

export const trainerSchema = gql`
  enum Gender {
    MALE
    FEMALE
  }

  input CreateTrainerInput {
    firstName: String!
    lastName: String!
    birthDate: String!
    image: String!
    country: String!
    gender: Gender!
  }

  type Trainer {
    _id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    image: String!
    country: String!
    gender: Gender!
    fullName: String!
  }

  type Query {
    getAllTrainers: [Trainer]!
    getFreeTrainers: [Trainer]!
  }

  type Mutation {
    createRandomTrainer: Trainer!
    createTrainer: ID!
  }
`;

export const trainerResolvers = {
  Query: {
    getAllTrainers: () => getAllTrainers,
    getFreeTrainers: () => getFreeTrainers(),
  },
  Mutation: {
    createRandomTrainer: () => createRandomTrainer(),
  },
};
