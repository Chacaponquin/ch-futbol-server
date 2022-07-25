import { HttpQueryError } from "apollo-server-core";

export const getUserByToken = async ({ currentUser }) => {
  try {
    if (currentUser) {
      const elementsOwner = await currentUser.elementsOwner();
      return { ...currentUser.toObject(), elementsOwner };
    } else throw new Error("No existe ese usuario");
  } catch (error) {
    console.log(error);
    throw new HttpQueryError(400, "No existe ese usuario");
  }
};
