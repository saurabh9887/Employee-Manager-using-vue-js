import express from "express";
import { state } from "../model/state.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newState = new state({
      name: req.body.name,
    });

    const savedState = await newState.save();
    res.status(200).json(savedState);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const states = await state.find({});
    res.status(200).json(states);
  } catch (error) {
    console.log(error);
  }
});

export default router;
