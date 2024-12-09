import express, {Express} from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import post_routes from "./routes/post_route.js";

const initApp = () => {
  return new Promise<Express>((resolve, reject) => {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to the database");
    });
    mongoose
      .connect(process.env.DB_CONNECT)
      .then(() => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use("/post", post_routes);
        resolve(app);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default initApp;