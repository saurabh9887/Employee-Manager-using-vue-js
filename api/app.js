import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import EmpRoute from "./routes/empRoute.js";
import EmpRes from "./routes/empResRoute.js";
import stateRoute from "./routes/stateRoute.js";
import cityRoute from "./routes/cityRoute.js";
import talukaRoute from "./routes/talukaRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/emp", EmpRoute);
app.use("/api/empRes", EmpRes);
app.use("/api/state", stateRoute);
app.use("/api/city", cityRoute);
app.use("/api/taluka", talukaRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("connected to db"));
