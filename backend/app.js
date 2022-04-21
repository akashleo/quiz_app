const express = require("express");

const mongoose = require("mongoose");
//const router = require("./routes/bookRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();

// app.get("/", (req, res) => res.send("Hello world!"));

// const port = process.env.PORT || 8082;

// app.listen(port, () => console.log(`Server running on port ${port}`));

app.use(express.json());
app.use(cors());
//app.use("/books", router);

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.azzwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to Database"))
  .then(() => {
    app.listen(8082);
  })
  .catch((error) => console.log(error));
