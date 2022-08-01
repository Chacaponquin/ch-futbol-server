import mongoose from "mongoose";
import { messageReceptors } from "../../helpers/messageReceptor.js";

const replySchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    from: {
      type: mongoose.Types.ObjectId,
      refPath: "fromModel",
      required: true,
    },
    fromModel: {
      type: String,
      enum: Object.values(messageReceptors),
      required: true,
    },
    peopleWhoSee: {
      type: [{ type: mongoose.Types.ObjectId, required: true }],
      default: [],
    },
  },
  { timestamps: { createdAt: "create_at" } }
);

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
    peopleWhoSee: {
      type: [{ type: mongoose.Types.ObjectId, required: true }],
      default: [],
    },
    replys: { type: [replySchema], default: [] },
  },
  { timestamps: { createdAt: "create_at" } }
);

export default mongoose.model("Message", messageSchema);
