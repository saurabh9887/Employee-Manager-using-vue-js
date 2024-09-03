import express from "express";
import { taluka } from "../model/taluks.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newTaluka = new taluka({
      name: req.body.name,
      cityId: req.body.cityId,
    });

    const savedTaluka = await newTaluka.save();
    res.status(200).json(savedTaluka);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { cityId } = req.query;
    const Talukas = await taluka.find({ cityId: cityId });
    res.status(200).json(Talukas);
  } catch (error) {
    console.log(error);
  }
});

export default router;
