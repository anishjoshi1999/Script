const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const Count = require("./Model/Count");
// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@projects.f7s6vqh.mongodb.net/${process.env.MONGODB_ATLAS_COLLECTION}`;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to Mongodb Atlas");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Serving on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("error found");
    console.log(err);
  });
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Express app with body-parser and dotenv setup");
});
app.get("/count", async (req, res) => {
  try {
    const countDocument = await Count.findOne();
    if (countDocument) {
      countDocument.count += 1;
    } else {
      countDocument = new Count({ count: newCount });
    }
    await countDocument.save();
    res.json({ count: countDocument.count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the count." });
  }
});

// Insert/update count
app.post("/count", async (req, res) => {
  const newCount = req.body.count;
  try {
    let countDocument = await Count.findOne();
    if (countDocument) {
      countDocument.count = newCount;
    } else {
      countDocument = new Count({ count: newCount });
    }
    await countDocument.save();
    res.json({ count: countDocument.count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the count." });
  }
});
