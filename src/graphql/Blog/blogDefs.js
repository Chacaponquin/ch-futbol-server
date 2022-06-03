import { gql } from "apollo-server-core";
import { createRandomArticle } from "../../helpers/tasks/blog/createRandomArticle.js";
import { fetchBlogArticles } from "../../helpers/tasks/blog/fetchBlogArticles.js";

export const blogSchema = gql `
  type BlogArticle {
    _id: ID!
    title: String!
    resume: String!
    content: String!
    author: String
    createdAt: String!
  }

  type Mutation {
    createRandomArticle: BlogArticle!
  }

  type Query {
    fetchBlogArticles: [BlogArticle]!
  }
`;

export const blogResolver = {
    Mutation: {
        createRandomArticle: () => createRandomArticle(),
    },
    Query: {
        fetchBlogArticles: () => fetchBlogArticles(),
    },
};