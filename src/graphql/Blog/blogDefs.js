import { gql } from "apollo-server-core";
import { createRandomArticle } from "../../helpers/tasks/blog/createRandomArticle.js";
import { fetchBlogArticles } from "../../helpers/tasks/blog/fetchBlogArticles.js";
import { findBlogArticleById } from "../../helpers/tasks/blog/findBlogArticleById.js";

export const blogSchema = gql `
  input ArticleInput {
    id: ID!
  }

  type BlogArticle {
    _id: ID!
    title: String!
    resume: String!
    content: String!
    author: String
    createdAt: String!
    likes: [String]
  }

  type Mutation {
    createRandomArticle: BlogArticle!
  }

  type Query {
    fetchBlogArticles: [BlogArticle]!
    findBlogArticleById(article: ArticleInput!): BlogArticle
  }
`;

export const blogResolver = {
    Mutation: {
        createRandomArticle: () => createRandomArticle(),
    },
    Query: {
        fetchBlogArticles: () => fetchBlogArticles(),
        findBlogArticleById: (root, args) => findBlogArticleById(args.article),
    },
};