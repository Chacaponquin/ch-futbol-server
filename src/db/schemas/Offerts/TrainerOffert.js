import mongoose from "mongoose";

const playerOffert = new mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  trainer: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Trainer",
  },
  accepted: { type: Boolean, default: false },
  salary: { type: mongoose.SchemaTypes.Number, default: 0, min: 0 },
  offerts: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
    ref: "TrainerOffert",
  },
});

export default mongoose.model("TrainerOffert", playerOffert);
