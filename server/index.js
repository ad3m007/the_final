const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./Config/connectDB")
app.use(express.json())
const userRoute = require("./Routes/userRoute")
const gameRoute = require("./Routes/gameRoute")
const libraryRoute = require("./Routes/libraryRoute")
app.use("/users", userRoute)
app.use("/api/games", gameRoute)
app.use("/api/library", libraryRoute)

connectDB()

const port = process.env.PORT;

app.listen(port, (err) =>
  err ? console.log(err) : console.log("server is running on port 5000")
);
