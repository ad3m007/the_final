const express = require("express");
const Game = require("../Models/gameSchema");
const router = express.Router();
const isAuth = require("../Middlewares/isAuth");
const isAdmin = require("../Middlewares/isAdmin");

// GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create game
router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const game = new Game(req.body);
    const saved = await game.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ msg: "Invalid payload" });
  }
});

// PUT update game by id (admin only)
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ msg: "Game not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: "Invalid payload" });
  }
});

// DELETE game by id (admin only)
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Game not found" });
    res.json({ msg: "Game deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid request" });
  }
});

module.exports = router;





