import mongoose from "mongoose";

const seasonRecordSchema = new mongoose.Schema({
  yearStart: { type: Number, required: true },
  yearFinish: { type: Number, required: true },
  goals: { type: Number, min: 0, default: 0 },
  assists: { type: Number, default: 0, min: 0 },
  players: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Player" }],
    maxlength: 25,
    minlength: 15,
  },
  trainer: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Trainer" }],
    maxlength: 5,
    minlength: 1,
  },
});

const teamSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: { type: String, required: true, maxlength: 30, unique: true },
  image: { type: String, required: true },
  fundationYear: {
    type: Number,
    required: true,
    max: new Date().getFullYear(),
    min: 1700,
  },
  budget: {
    type: mongoose.SchemaTypes.Number,
    default: 30000,
    min: 300000,
    max: 500000000,
  },
  league: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "League",
  },
  color: {
    type: String,
    required: true,
    maxlength: 7,
    default: "#000000",
  },
  transferRecord: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Transfer" }],
    default: [],
  },
  seasonRecord: { type: [seasonRecordSchema], default: [] },
  messages: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
    default: [],
  },
});

teamSchema.set("toObject", { virtuals: true });
teamSchema.set("toJSON", { virtuals: true });

teamSchema.virtual("actualTeam").get(function () {
  const finalPos = this.seasonRecord.length - 1;

  if (this.seasonRecord.length === 0) return null;
  else
    return {
      players: this.seasonRecord[finalPos].players,
      trainer: this.seasonRecord[finalPos].trainer,
    };
});

teamSchema.method("peopleToSendMessage", function () {
  console.log(this.actualTeam);

  return [];
});

export default mongoose.model("Team", teamSchema);
