import mongoose from "mongoose";

const City = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stateId: {
      type: String,
      required: true, 
    },
  },
  { timeStamp: true }
);

export const city = mongoose.model("City", City);
