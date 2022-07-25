import mongoose from "mongoose";
import { userRoles, userCategorys } from "../../helpers/userRoles.js";
import Player from "./Player.js";
import Team from "./Teams.js";
import Trainer from "./Trainer.js";

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

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.method("elementsOwner", function () {
  if (this.role == userRoles.MANAGER) return [];
  else if (this.role == userRoles.PLAYER) {
    return Player.find({ createdBy: this._id });
  } else if (this.role == userRoles.CLUB_OWNER) {
    return Team.find({ createdBy: this._id });
  } else if (this.role == userRoles.TRAINER) {
    return Trainer.find({ createdBy: this._id });
  }
});

userSchema.method("peopleToSendMessage", function () {
  return mongoose.model("User").find({ _id: { $ne: this._id } });
});

userSchema.virtual("isAdmin").get(function () {
  return !(this.category == userCategorys.CURRENT_USER);
});

export default mongoose.model("User", userSchema);
