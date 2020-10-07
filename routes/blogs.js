const router = require("express").Router();
let Blog = require("../models/blog.model");

//show all blog posts
router.get("/", (req, res) => {
  Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json("ERROR: " + err));
});

//show one blogpost
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json("ERROR: " + err));
});

//add one blog
router.post("/addBlog", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const authorId = req.body.authorId;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const newBlog = new Blog({
    title,
    author,
    authorId,
    description,
    date
  });
  newBlog
    .save()
    .then(newBlog => res.json(newBlog))
    .catch();
});

//update one blog
router.route("/update/:id").post((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      blog.title = req.body.title;
      blog.author = req.body.author;
      blog.authorId = req.body.authorId;
      blog.description = req.body.description;
      blog.date = Date.parse(req.body.date);

      blog
        .save()
        .then(() => res.json(blog))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error:" + err));
});
//delete one user
router.delete("/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(res.send("Blog post is deleted!"))
    .catch(err => res.status(400).json("Error:" + err));
});

//add comments on one post
router.post("/:id/comments", (req, res) => {
  // get the blog for :id
  Blog.findById(req.params.id)
    .then(blog => {
      // create a comments array with new comment
      const comments = blog.comments.concat({
        comment: req.body.comment,
        name: req.body.name
      });

      // update the blog comments array
      blog.comments = comments;

      //save the blog with updated comments
      blog
        .save()
        .then(() => res.json(blog))
        .catch(err => {
          console.log(err);
          return res.status(400).json("Error" + err);
        });
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
