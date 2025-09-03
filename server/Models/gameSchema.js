const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    platform: { type: String },
    price: { type: Number },
    releaseDate: { type: Date },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;



