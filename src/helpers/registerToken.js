import jwt from "jsonwebtoken";

export const registerToken = async (user) => {
  const doc = await user.save();
  const token = jwt.sign({ id: user.id }, process.env.SECRET_WORD);

  const { isAdmin, username, image, email, role, _id } = user;

  return { isAdmin, username, image, email, role, _id, token };
};
