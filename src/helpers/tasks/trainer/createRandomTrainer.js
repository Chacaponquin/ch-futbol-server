import { faker } from "@faker-js/faker";
import { HttpQueryError } from "apollo-server-core";
import Trainer from "../../../db/schemas/Trainer.js";
import { countryList } from "../../allCountries.js";

export const createRandomTrainer = async () => {
  const dtPast = new Date();
  dtPast.setFullYear(dtPast.getFullYear() - 85);
  const dtNow = new Date();
  dtNow.setFullYear(dtNow.getFullYear() - 30);

  const birthDate = faker.date.between(dtPast, dtNow);

  const newTrainer = new Trainer({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate,
    image: faker.image.avatar(),
    country: countryList[Math.floor(Math.random() * countryList.length)],
    gender: "MALE",
  });

  try {
    await newTrainer.save();

    return newTrainer;
  } catch (error) {
    throw new HttpQueryError(501, error.message);
  }
};
