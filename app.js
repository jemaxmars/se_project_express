const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const { createUser, loginUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    ("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.post("/signin", loginUser);
app.post("/signup", createUser);

app.use("/", mainRouter);

app.listen(PORT, "0.0.0.0", () => {
  `Server is listening on port ${PORT}`;
});
