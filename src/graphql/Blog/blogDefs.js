import { gql } from "apollo-server-core";
import { createRandomArticle } from "../../helpers/tasks/blog/createRandomArticle.js";

export const blogSchema = gql `
  type BlogArticle {
    _id: ID!
    title: String!
  }

  type Mutation {
    createRandomArticle: BlogArticle!
  }
`;

export const blogResolver = {
    Mutation: {
        createRandomArticle: () => createRandomArticle(),
    },
};