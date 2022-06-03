import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "chaca-sa",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLAUDINARY_API_SECRET,
});