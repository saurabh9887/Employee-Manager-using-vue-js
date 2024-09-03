import mongoose from "mongoose";

const State = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

export const state = mongoose.model("State", State);
