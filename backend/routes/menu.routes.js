const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// SEARCH menu items
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    const items = await MenuItem.find({
      name: { $regex: q, $options: "i" }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

// GET menu item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(404).json({ message: "Item not found" });
  }
});

// CREATE menu item
router.post("/", async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(400).json({ message: "Invalid data" });
  }
});

// UPDATE menu item
router.put("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// DELETE menu item
router.delete("/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
});

// TOGGLE availability
router.patch("/:id/availability", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    item.isAvailable = !item.isAvailable;
    await item.save();
    res.json(item);
  } catch  {
    res.status(400).json({ message: "Toggle failed" });
  }
});

module.exports = router;
