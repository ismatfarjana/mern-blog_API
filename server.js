const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.error("Error connecting to mongoDB", err);
  });

const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
app.use("/blogs", blogsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Express API listening on port ${port}!`);
});
