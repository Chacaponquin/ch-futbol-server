import mongoose from "mongoose";
import { userRoles } from "../../helpers/userRoles.js";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(userRoles),
    },
  },
  { timestamps: { createdAt: "create_at" } }
);

export default mongoose.model("User", userSchema);
