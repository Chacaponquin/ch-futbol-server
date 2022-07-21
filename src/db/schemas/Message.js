import mongoose from "mongoose";
import { messageReceptors } from "../../helpers/messageReceptor.js";

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, minlength: 5 },
    title: { type: String, required: true },
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "fromModel",
    },
    to: { type: mongoose.Types.ObjectId, required: true, refPath: "toModel" },
    toModel: {
      enum: Object.values(messageReceptors),
      required: true,
      type: String,
    },
    fromModel: {
      enum: Object.values(messageReceptors),
      required: true,
      type: String,
    },
  },
  { timestamps: { createdAt: "create_at" } }
);

export default mongoose.model("Message", messageSchema);
