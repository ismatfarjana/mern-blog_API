const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    description: { type: String, required: true, minlength: 10 },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
