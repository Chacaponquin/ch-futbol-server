import mongoose from "mongoose";

const offertSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  element: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: "elementType",
  },
  elementType: { type: String, required: true, enum: ["Player", "Trainer"] },
  mount: { type: Number, default: 0, min: 0 },
  accepted: { type: Boolean, default: false },
  salary: { type: Number, default: 0, min: 0 },
  team: { type: mongoose.Types.ObjectId, required: true, ref: "Team" },
});

export default mongoose.model("PlayerOffert", offertSchema);
