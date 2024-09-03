const express = require("express");
const router = express.Router();
const Person = require("../model/modele"); // Ensure the file path is correct

// POST route to create a new person
router.post("/", async (req, res) => {
  try {
    const newPerson = req.body;
    const person = new Person(newPerson);
    const response = await person.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET route to fetch all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET route to fetch a person by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["chef", "waiter", "manager"].includes(workType)) {
      const response = await Person.findOne({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT route to update a person by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE route to delete a person by ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "Person deleted" });
  } catch (error) {
    console.log("Error deleting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
