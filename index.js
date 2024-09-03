const express = require("express");
const bodyParser = require("body-parser");
const MenuItem = require("./model/menu");
const Person = require("./model/modele");
const db = require("./db"); // Ensure db connection is correctly set up

const app = express();
app.use(bodyParser.json());

// MenuItem API routes
const menuItemRoutes = require("./routes/menuRotes");
const personRoutes = require("./routes/personroutes");
app.use("/MenuItem", menuItemRoutes);
app.use("/", personRoutes);

// GET route to fetch menu items
app.get('/MenuItem', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to fetch person by taste
app.post("/:taste", async (req, res) => {
  try {
    const tastework = req.params.taste;

    if (tastework == "spicy" || tastework == "danser" || tastework == "raj") {
      const response = await Person.findOne({ taste: tastework });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT route to update a person by ID
app.put("/:id", async (req, res) => {
  try {
    const menuid = req.params.id;
    const updateData = req.body;

    const response = await Person.findByIdAndUpdate(menuid, updateData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    console.log("Menu item updated");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
