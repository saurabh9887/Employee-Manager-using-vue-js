import express from "express";
import { Employee } from "../model/employee.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      id: req.body.id,
      mobileNumber: req.body.mobileNumber,
      designation: req.body.designation,
      state: req.body.state,
      city: req.body.city,
      talukas: req.body.talukas,
      skills: req.body.skills,
      address: req.body.address,
      lastCompany: req.body.lastCompany,
      salary: req.body.salary,
      gender: req.body.gender,
    });

    const savedEmployee = await newEmployee.save();
    res.status(200).json(savedEmployee);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const emp = await Employee.find({});
    res.status(200).json(emp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) {
      res.status(201).send("Employee not found!");
    }
    res.status(200).json(emp);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) res.status(201).send("Employee with this id not found!");
    res.status(200).send("Employee deleted successfully!");
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit/:paramId", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.paramId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ msg: "Employee not found!" });
    }
    res
      .status(200)
      .json({ msg: "Employee details Updated!", Employee: updatedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
