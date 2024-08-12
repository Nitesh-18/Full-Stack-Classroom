import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express, { json } from "express";
import cors from "cors";
import { app } from "./app.js";
import connectDB from "./db/database.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MongoDb Connection failed !", error);
  });
