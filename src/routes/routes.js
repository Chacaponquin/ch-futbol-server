import { Router } from "express";
import { uploadImage } from "./uploadImage.js";

const app = Router();

app.post("/uploadImage", uploadImage);

export default app;