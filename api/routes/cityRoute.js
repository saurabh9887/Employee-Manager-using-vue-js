import express from "express";
import { city } from "../model/city.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newCity = new city({
      name: req.body.name,
      stateId: req.body.stateId,
    });

    const savedCity = await newCity.save();
    res.status(200).json(savedCity);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { stateId } = req.query; // Get stateId from the query parameters

    // if (!stateId) {
    //   return res.status(400).json({ message: "State ID is required" });
    // }

    const cities = await city.find({ stateId: stateId });
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
  }
});

export default router;
