const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  name: { type: String, required: true }
});

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    description: { type: String, required: true, minlength: 3 },
    date: { type: Date, required: true },
    comments: [
      {
        comment: String,
        name: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
