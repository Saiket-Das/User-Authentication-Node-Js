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
const userRoutes = require("./backend/routes/user.route");

app.get("/", (req, res) => {
  res.send("User Auth is running");
});

app.use("/api/user", userRoutes);

app.listen(port, function () {
  console.log(`User Auth is running on ${port}`.yellow);
});
