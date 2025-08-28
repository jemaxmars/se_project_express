const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

// Import the controllers
const { createUser, loginUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());

// Temporary middleware for tests - sets user ID
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133"
  };
  next();
});

// Add these routes
app.post("/signin", loginUser);
app.post("/signup", createUser);

app.use("/", mainRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
});
