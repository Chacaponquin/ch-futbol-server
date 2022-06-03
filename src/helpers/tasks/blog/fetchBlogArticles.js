import { HttpQueryError } from "apollo-server-core";
import BlogArticle from "../../../db/schemas/BlogArticle.js";

export const fetchBlogArticles = async() => {
    try {
        return await BlogArticle.find().limit(10);
    } catch (error) {
        console.log(error);
        throw new HttpQueryError(error);
    }
};