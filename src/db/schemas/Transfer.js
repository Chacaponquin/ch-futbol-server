import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    from: { type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
    to: { type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
    player: { type: mongoose.SchemaTypes.ObjectId, ref: "Player" },
    price: { type: Number, default: 0, min: 0 },
  },
  { timestamps: { createdAt: "create_at" } }
);

export default mongoose.model("Transfer", transferSchema);
