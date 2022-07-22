import { Router } from "express";
import { getPlayersCSV } from "./getPlayersCSV.js";
import { uploadImage } from "./uploadImage.js";

const app = Router();

app.post("/uploadImage", uploadImage);
app.get("/getAllPlayersCSV", getPlayersCSV);

export default app;
