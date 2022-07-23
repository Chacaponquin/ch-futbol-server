import mongoose from "mongoose";
import { userRoles, userCategorys } from "../../helpers/userRoles.js";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(userRoles),
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(userCategorys),
    },
    messages: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
      default: [],
    },
  },
  { timestamps: { createdAt: "create_at" } }
);

userSchema.virtual("isAdmin").get(function () {
  return !(this.category == userCategorys.CURRENT_USER);
});

export default mongoose.model("User", userSchema);
