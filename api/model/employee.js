import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
      min: [0, "Employee ID cannot be negative"],
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    talukas: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
    },
    lastCompany: {
      type: String,
    },
    salary: {
      type: Number,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
