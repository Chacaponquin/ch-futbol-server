import mongoose from "mongoose";
import { countryList } from "../../helpers/allCountries.js";

const teamRecordSchema = new mongoose.Schema({
  yearStart: { type: Number, required: true },
  yearFinish: { type: Number, default: null },
  team: { type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
});

const trainerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    birthDate: { type: Date, required: true },
    image: { type: String, required: true },
    country: { type: String, required: true, enum: countryList },
    gender: { type: String, required: true, enum: ["MALE", "FEMALE"] },
    salary: { type: Number, min: 0 },
    socialMedia: { type: mongoose.SchemaTypes.Mixed, default: {} },
    teamsRecord: { type: [teamRecordSchema], default: [] },
    messages: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Message",
      default: [],
    },
  },
  { timestamps: { createdAt: "create_at" } }
);

// VIRTUAL CON LA EDAD DEL ENTRENADOR
trainerSchema.virtual("age").get(function () {
  return new Date().getFullYear() - this.birthDate.getFullYear();
});

// VIRTUAL PARA SABER SI ESTA LIBRE PARA FICHAR POR UN EQUIPO
trainerSchema.virtual("freeToTransfer").get(function () {
  const finalPos = this.teamsRecord.length - 1;

  return this.teamsRecord.length === 0 || this.teamsRecord[finalPos].yearFinish;
});

export default mongoose.model("Trainer", trainerSchema);
