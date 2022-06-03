import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    url: { type: String, required: true },
});

export default mongoose.model("Image", imagesSchema);