import mongoose from "mongoose";

const playerOffert = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  player: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Player",
  },
  mount: { type: Number, default: 0, min: 0 },
  accepted: { type: Boolean, default: false },
  salary: { type: Number, default: 0, min: 0 },
  team: { type: mongoose.Types.ObjectId, required: true, ref: "Team" },
});

export default mongoose.model("PlayerOffert", playerOffert);
