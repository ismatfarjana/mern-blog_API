const router = require("express").Router();
let User = require("../models/user.model");

//show all user
router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("ERROR: " + err));
});

//show one user
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("ERROR: " + err));
});

//add one user
router.post("/addUser", (req, res) => {
  const author = req.body.author;
  const newUser = new User({ author });
  newUser
    .save()
    .then(newUser => res.json(newUser))
    .catch();
});

//delete one user
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(res.send("Author profile is deleted!"))
    .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;
