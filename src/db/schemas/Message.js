import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, minlength: 5 },
    title: { type: String, required: true },
    from: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
    to: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  },
  { timestamps: { createdAt: "create_at" } }
);

export default mongoose.model("Message", messageSchema);
