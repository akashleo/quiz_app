const express = require("express");

const mongoose = require("mongoose");
const router = require("./routes/profileRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/profiles", router);

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.azzwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to Database"))
  .then(() => {
    app.listen(8082);
  })
  .catch((error) => console.log(error));
