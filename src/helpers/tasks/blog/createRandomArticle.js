import BlogArticle from "../../../db/schemas/BlogArticle.js";
import { faker } from "@faker-js/faker";
import { HttpQueryError } from "apollo-server-core";

export const createRandomArticle = async() => {
    const newArticle = new BlogArticle({
        content: faker.lorem.paragraphs(25),
        title: faker.lorem.sentence(),
        resume: faker.lorem.paragraph(),
    });

    try {
        await newArticle.save();

        return newArticle;
    } catch (error) {
        throw new HttpQueryError(error);
    }
};