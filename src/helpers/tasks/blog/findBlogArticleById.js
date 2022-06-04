import { HttpQueryError } from "apollo-server-core";
import BlogArticle from "../../../db/schemas/BlogArticle.js";

export const findBlogArticleById = async({ id }) => {
    try {
        return await BlogArticle.findOne({ _id: id });
    } catch (error) {
        console.log(error);
        throw new HttpQueryError(error);
    }
};