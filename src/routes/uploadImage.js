import { v2 as cloudinary } from "cloudinary";
import fs from "fs-extra";

const uploadImageCloudinary = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "futbolApi/players/images",
  });
};

export const uploadImage = async (req, res) => {
  const { image } = req.files;

  try {
    const result = await uploadImageCloudinary(image.tempFilePath);
    await fs.remove(image.tempFilePath);

    res.json({ imageUrl: result.url }).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
