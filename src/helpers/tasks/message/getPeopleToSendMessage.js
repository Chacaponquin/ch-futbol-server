import { HttpQueryError } from "apollo-server-core";
import mongoose from "mongoose";

export const getPeopleToSendMessage = async (elementID, currentUser) => {
  try {
    if (!elementID) {
      const people = await currentUser.peopleToSendMessage();

      return people;
    } else if (elementID) {
      const elementFound = await mongoose
        .model(currentUser.role)
        .findById(elementID);

      if (elementFound) {
        const people = await elementFound.peopleToSendMessage();

        return people;
      } else throw new Error("No existe ese elemento");
    } else throw new Error("Error en el paso de parametros");
  } catch (error) {
    throw new HttpQueryError(500, error.message);
  }
};
