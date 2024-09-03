import mongoose from "mongoose";

const Taluka = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cityId: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

export const taluka = mongoose.model("Taluka", Taluka);
