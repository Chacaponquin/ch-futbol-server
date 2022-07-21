import { faker } from "@faker-js/faker";
import { AuthenticationError } from "apollo-server-core";
import Player from "../../../db/schemas/Player.js";
import User from "../../../db/schemas/User.js";
import { countryList } from "../../allCountries.js";
import { playerPositions } from "../../playerPositions.js";
import { userCategorys } from "../../userRoles.js";

// FUNCION PARA CREAR LA MEDIA DE CADA AÑO DEL JUGADOR
const getMediaData = (yearStart, seasonPlayed) => {
  const arrayResult = [];

  for (let i = 0; i < seasonPlayed; i++) {
    arrayResult.push({
      year: yearStart++,
      media: Array(12)
        .fill(0)
        .map(() => faker.datatype.number({ min: 50, max: 99 })),
    });
  }

  return arrayResult;
};

// TODO: HAY QUE CREAR EL RECORD DE PRECIOS DEL JUGADOR
const getPriceData = (yearStart, seasonPlayed) => {
  const arrayResult = [];

  for (let i = 0; i < seasonPlayed; i++) {
    arrayResult.push({
      year: yearStart++,
      price: Array(12)
        .fill(0)
        .map(() => faker.datatype.number({ min: 30000, max: 400000000 })),
    });
  }

  return arrayResult;
};

// FUNCION PARA CREAR LAS REDES SOCIALES
const getSocialMediaData = () => {
  return {
    facebook: faker.internet.url(),
    instagram: faker.internet.url(),
    twitter: faker.internet.url(),
  };
};

// FUNCION PARA CREAR LOS DATOS DE CADA TEMPORADA DEL JUGADOR
const getSeasonData = (yearStart, seasonPlayed) => {
  const arrayResult = [];

  for (let i = 0; i < seasonPlayed; i++) {
    arrayResult.push({
      yearStart: yearStart++,
      yearFinish: yearStart,
      minutes: faker.datatype.number({ min: 100, max: 4000 }),
      assists: faker.datatype.number({ min: 0, max: 30 }),
      matchPlayed: faker.datatype.number({ min: 0, max: 50 }),
      goals: faker.datatype.number({ min: 0, max: 70 }),
      socialMedia: getSocialMediaData(),
    });
  }

  return arrayResult;
};

const generateRandomData = (yearStart) => {
  const seasonPlayed = new Date().getFullYear() - yearStart;

  return [
    getSocialMediaData(),
    getSeasonData(yearStart, seasonPlayed),
    getMediaData(yearStart, seasonPlayed),
    getPriceData(yearStart, seasonPlayed),
  ];
};

export const createRandomPlayer = async () => {
  const dtPast = new Date();
  dtPast.setFullYear(dtPast.getFullYear() - 45);
  const dtNow = new Date();
  dtNow.setFullYear(dtNow.getFullYear() - 16);

  const birthDate = faker.date.between(dtPast, dtNow);
  const yearStart = birthDate.getFullYear() + 16;

  const [socialMedia, seasonData, mediaData, priceData] =
    generateRandomData(yearStart);

  const createdBy = await User.findOne({ category: userCategorys.MANAGER });

  const newPlayer = new Player({
    createdBy: createdBy._id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate,
    image: faker.image.avatar(),
    salary: faker.datatype.number({ min: 500, max: 3000000 }),
    gender: "MALE",
    country: countryList[Math.floor(Math.random() * countryList.length)],
    mediaRecord: mediaData,
    seasonRecords: seasonData,
    socialMedia: socialMedia,
    playerPrice: priceData,
    // TODO: dorsalRecord,
    position:
      playerPositions[Math.floor(Math.random() * playerPositions.length)],
  });

  try {
    await newPlayer.save();

    return newPlayer;
  } catch (error) {
    console.log(error);
    throw new AuthenticationError("No se ha podido crear el jugador");
  }
};
