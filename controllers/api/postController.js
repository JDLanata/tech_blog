const express = require("express");
const router = express.Router();
const { Post, User, Comment } = require("../../models");

router.get("/", (req, res) => {
  Post.findAll({
    include: [User]
  })
    .then(dbPosts => {
      if (dbPosts.length) {
        res.json(dbPosts);
      } else {
        res.status(404).json({ message: "No Posts found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("you must log in first!")
  }
  Post.create({
    title: req.body.title,
    description: req.body.description,
    UserId: req.session.user.id
  })
    .then(newPost => {
      res.json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

module.exports = router;
