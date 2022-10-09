require("dotenv").config();
const dbConnection = require("./backend/confiq/db");

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

// ------> Middleware
app.use(cors());
app.use(express.json());

dbConnection();

// Routes

app.get("/", (req, res) => {
  res.send("User Auth is running");
});

app.listen(port, function () {
  console.log(`User Auth is running on ${port}`.yellow);
});
