import jwt from "jsonwebtoken";
import { returnUserConstructor } from "./returnUserConstructor.js";

export const registerToken = async (user) => {
  const doc = await user.save();
  const token = jwt.sign({ id: user.id }, process.env.SECRET_WORD);

  const userReturn = await returnUserConstructor(user);
  return { ...userReturn, token };
};
