const express = require("express");
const router = express.Router();
const UserLibrary = require("../Models/userLibrarySchema");
const Game = require("../Models/gameSchema");
const isAuth = require("../Middlewares/isAuth");

// Add game to user library
router.post("/add", isAuth, async (req, res) => {
  try {
    const { gameId } = req.body;
    const userId = req.user._id;

    // Check if game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ msg: "Game not found" });
    }

    // Check if already in library
    const existing = await UserLibrary.findOne({ userId, gameId });
    if (existing) {
      return res.status(400).json({ msg: "Game already in library" });
    }

    // Add to library
    const libraryEntry = new UserLibrary({
      userId,
      gameId,
    });
    await libraryEntry.save();

    res.status(201).json({ msg: "Game added to library", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user's library
router.get("/", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const library = await UserLibrary.find({ userId })
      .populate("gameId")
      .sort({ purchasedAt: -1 });

    const games = library.map(entry => entry.gameId);
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Remove game from library
router.delete("/:gameId", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { gameId } = req.params;

    const deleted = await UserLibrary.findOneAndDelete({ userId, gameId });
    if (!deleted) {
      return res.status(404).json({ msg: "Game not found in library" });
    }

    res.json({ msg: "Game removed from library" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

