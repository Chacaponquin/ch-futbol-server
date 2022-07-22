import { HttpQueryError } from "apollo-server-core";
import { returnUserConstructor } from "../../returnUserConstructor.js";

export const getUserByToken = async ({ currentUser }) => {
  try {
    if (currentUser) return await returnUserConstructor(currentUser);
    else throw new Error("No existe ese usuario");
  } catch (error) {
    console.log(error);
    throw new HttpQueryError(400, "No existe ese usuario");
  }
};
