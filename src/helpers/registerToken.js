import jwt from "jsonwebtoken";

export const registerToken = async (user) => {
  await user.save();
  const token = jwt.sign({ id: user.id }, process.env.SECRET_WORD);

  const elementsOwner = await user.elementsOwner();

  return { ...user.toObject(), token, elementsOwner };
};
