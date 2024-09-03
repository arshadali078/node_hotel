const express = require('express');
const router = express.Router();
const MenuItem = require('../model/modele'); // Ensure the file path is correct

// GET route to fetch all menu items
router.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to create a new menu item
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    // Validate num_sales field (if num_sales should be a number)
    if (typeof data.num_sales !== 'number') {
      return res.status(400).json({ error: "Invalid value for num_sales. It must be a number." });
    }

    // Create a new MenuItem document using the mongoose model
    const newMenuItem = new MenuItem(data);
    
    // Save the new MenuItem to the database
    const response = await newMenuItem.save();
    console.log('Data saved');
    res.status(201).json(response);
  } catch (error) {
    console.log("Error saving data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
