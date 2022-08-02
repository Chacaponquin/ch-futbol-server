import { HttpQueryError } from "apollo-server-core";
import mongoose from "mongoose";

export const getOffertsById = async (elementID, { currentUser }) => {
  try {
    if (currentUser) {
      const { offerts } = await mongoose
        .model(currentUser.role)
        .findById(elementID)
        .populate("offerts")
        .slice(0, 15);

      console.log(offerts);

      return offerts;
    }
  } catch (error) {
    throw new HttpQueryError(500, "Hubo un error");
  }
};
