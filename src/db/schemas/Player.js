import mongoose from "mongoose";
import { countryList } from "../../helpers/allCountries.js";
import { playerPositions } from "../../helpers/playerPositions.js";

const priceRecordSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  price: {
    type: [
      {
        type: Number,
        required: true,
        min: 30000,
        max: 400000000,
      },
    ],
    required: true,
    maxlength: 12,
  },
});

const teamRecordSchema = new mongoose.Schema({
  yearStart: { type: Number, required: true },
  yearFinish: { type: Number, default: null },
  team: { type: mongoose.Types.ObjectId, ref: "Team", required: true },
  transfer: {
    type: mongoose.Types.ObjectId,
    ref: "Transfer",
    required: true,
  },
});

const dorsalRecordSchema = new mongoose.Schema({
  yearStart: { type: Number, required: true },
  yearFinish: { type: Number, default: null },
  dorsal: { type: Number, required: true, min: 1, max: 99 },
});

const mediaRecordSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  media: {
    type: [{ type: Number, required: true, min: 50, max: 99 }],
    maxlength: 12,
    required: true,
  },
});

const seasonRecordSchema = new mongoose.Schema({
  yearStart: { type: Number, required: true },
  yearFinish: { type: Number, required: true },
  minutes: { type: Number, min: 0, default: 0 },
  assists: { type: Number, min: 0, default: 0 },
  matchPlayed: { type: Number, min: 0, default: 0 },
  goals: { type: Number, default: 0, min: 0 },
});

const playerSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    alias: { type: String, default: null },
    birthDate: { type: Date, required: true },
    image: { type: String, required: true },
    mediaRecord: {
      type: [mediaRecordSchema],
      default: [],
    },
    gender: { type: String, required: true, enum: ["MALE", "FEMALE"] },
    position: {
      type: String,
      required: true,
      enum: playerPositions,
    },
    country: { type: String, required: true, enum: countryList },

    salary: { type: Number, min: 0, default: 0 },

    teamsRecord: {
      type: [teamRecordSchema],
      default: [],
    },

    dorsalRecord: {
      type: [dorsalRecordSchema],
      default: [],
    },

    playerPrice: { type: [priceRecordSchema], default: [] },

    socialMedia: { type: mongoose.SchemaTypes.Mixed, default: {} },

    nationStats: { default: {} },

    seasonRecords: { type: [seasonRecordSchema], default: [] },

    messages: {
      type: [{ type: mongoose.Types.ObjectId, required: true }],
      ref: "Message",
      default: [],
    },

    offerts: {
      type: [{ type: mongoose.Types.ObjectId, required: true }],
      default: [],
      ref: "PlayerOffert",
    },
  },
  { timestamps: { createdAt: "create_at" } }
);

playerSchema.set("toObject", { virtuals: true });
playerSchema.set("toJSON", { virtuals: true });

// VIRTUAL PARA VER EL EQUIPO ACTUAL DEL JUGADOR
playerSchema
  .virtual("actualTeam", {
    ref: "Team",
    localField: "actualTeam",
    foreignField: "_id",
  })
  .get(function () {
    const finalPos = this.teamsRecord.length - 1;

    if (this.teamsRecord.length === 0) return null;
    else return this.teamsRecord[finalPos].team;
  });

playerSchema.method("peopleToSendMessage", function () {
  console.log(this.actualTeam);

  return [];
});

// VIRTUAL CON EL NOMBRE COMPLETO
playerSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// VIRTUAL DE CANTIDAD DE TEMPORADAS JUGADAS
playerSchema.virtual("totalSeasonPlayed").get(function () {
  return new Date().getFullYear() - 16 - this.birthDate.getFullYear();
});

// VIRTUAL CON LA EDAD DEL JUGADOR
playerSchema.virtual("age").get(function () {
  return new Date().getFullYear() - this.birthDate.getFullYear();
});

// VIRTUAL PARA SABER SI ESTA LIBRE PARA JUGAR POR UN EQUIPO
playerSchema.virtual("freeToTransfer").get(function () {
  const finalPos = this.teamsRecord.length - 1;

  return this.teamsRecord.length === 0 || this.teamsRecord[finalPos].yearFinish;
});

playerSchema.virtual("actualPrice").get(function () {
  const finalPos = this.playerPrice.length - 1;

  if (this.playerPrice.length === 0) return 0;
  else {
    const ultimatePrice = this.playerPrice[finalPos].price.length - 1;
    return this.playerPrice[finalPos].price[ultimatePrice];
  }
});

playerSchema.virtual("totalStats").get(function () {
  let sumGoals = 0;
  let sumAssists = 0;

  for (let i = 0; i < this.seasonRecords.length; i++) {
    sumGoals += this.seasonRecords[i].goals;
    sumAssists += this.seasonRecords[i].assists;
  }

  return { totalGoals: sumGoals, totalAssists: sumAssists };
});

export default mongoose.model("Player", playerSchema);
