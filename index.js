require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task.model");
const taskRoute = require("./routes/task.route");
const cors = require("cors");

const app = express();
const uri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoute);

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed connecction: ", error);
  }
}

run();
