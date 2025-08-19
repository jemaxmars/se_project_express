const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db")
.then(() => {
  console.log("Connected to MongoDB");
})
  .catch(console.error);


app.use(express.json());

// Temporary middleware to simulate authentication
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // Hardcoded user ID
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});