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
        res.status(404).json({ message: "No Post posts found!" });
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

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [User, Comment],
  })
    .then((bData) => {
      const hbsPosts = bData.get({ plain: true });
      if (req.session.user) {
        hbsPosts.username = req.session.user.username;
        hbsPosts.usernameId = req.session.user.id;
        res.render("singlePost", hbsPosts);
      } else {
        res.render("singlePost", hbsPosts);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

//delete one Post post

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  }).then((delPosts) => {
    res.json(delPosts);
  });
});

module.exports = router;
