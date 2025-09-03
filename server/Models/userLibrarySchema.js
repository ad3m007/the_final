const mongoose = require("mongoose");

const userLibrarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate purchases
userLibrarySchema.index({ userId: 1, gameId: 1 }, { unique: true });

const UserLibrary = mongoose.model("UserLibrary", userLibrarySchema);
module.exports = UserLibrary;

