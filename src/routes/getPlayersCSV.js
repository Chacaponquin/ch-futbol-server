import csvwriter from "csv-writer";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import Player from "../db/schemas/Player.js";

export const getPlayersCSV = async (req, res) => {
  const createCsvWriter = csvwriter.createObjectCsvWriter;

  // Passing the column names intp the module
  const csvWriter = createCsvWriter({
    // Output csv file name is geek_data
    path: "./public/allPlayersData.csv",
    header: [
      // Title of the columns (column_names)
      { id: "_id", title: "Id" },
      { id: "fullName", title: "Name" },
      { id: "age", title: "Age" },
      { id: "country", title: "Country" },
      { id: "position", title: "Position" },
      { id: "gender", title: "Gender" },
    ],
  });

  // Values for each column through an array
  const results = await (
    await Player.find()
  ).map((player) => {
    return {
      _id: player._id,
      age: player.age,
      country: player.country,
      position: player.position,
      gender: player.gender,
      fullName: player.fullName,
    };
  });

  // Writerecords function to add records
  csvWriter
    .writeRecords(results)
    .then(async () => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const route = path.join(__dirname, "../../", "public/allPlayersData.csv");
      res.download(route, "allPlayersData.csv", (err) => {
        if (err) return;
      });

      await fs.remove(route, () => {});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
};
