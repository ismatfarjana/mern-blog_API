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

app.get("/", (req, res) => {
  res.send(
    "Homepage of Syeda's MERN Blog API. All data are saved in MongoDB and is for learning purpose. Add '/users' at the end of the url for users data, Add '/blogs' at the end of the url for blogs data. To explore more about this API please contact Syeda Ismat Farjana on LinkedIn. Thank you!"
  );
});

const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
app.use("/blogs", blogsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Express API listening on port ${port}!`);
});
