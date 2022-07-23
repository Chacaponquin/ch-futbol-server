import mongoose from "mongoose";
import { countryList } from "../../helpers/allCountries.js";

const seasonRecordSchema = new mongoose.Schema({
  yearStart: { type: Number, required: true },
  yearFinish: { type: Number, required: true },
  teams: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Team" }],
    default: [],
    maxlength: { type: Number, refPath: "maxCantTeams" },
  },
});

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50, unique: true },
  country: { type: String, required: true, maxlength: 50, enum: countryList },
  maxCantTeams: { type: Number, max: 28, min: 15 },
  seasonRecord: { type: [seasonRecordSchema], default: [] },
});

leagueSchema.set("toObject", { virtuals: true });
leagueSchema.set("toJSON", { virtuals: true });

leagueSchema.virtual("availibleForTeams").get(function () {
  if (this.seasonRecord.length === 0) return true;
  else {
    const finalPos = this.seasonRecord.length - 1;

    return this.seasonRecord[finalPos].teams.length < this.maxCantTeams;
  }
});

export default mongoose.model("League", leagueSchema);
