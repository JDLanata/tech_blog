const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../../models");


//checks for all comments
router.get("/", (req, res) => {
  if(!req.session.user){
    return res.redirect("/login")}
  Comment.findAll({
    include: [User, Post],
  })
    .then((dbComments) => {
      if (dbComments.length) {
        res.json(dbComments);
      } else {
        res.status(404).json({ message: "No comments found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

//checks for one comment by id

router.get("/:id", (req, res) => {
  if(!req.session.user){
    return res.redirect("/login")}
  Comment.findOne({
    where: {id: req.params.id
    }
  })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

//create a user comment

router.post("/:id", (req, res) => {
  if(!req.session.user){
    return res.redirect("/login")}
  Comment.create({
    body: req.body.body,
    username: req.session.user.username,
    PostId: req.params.id,
    UserId: req.session.user.id,
  })
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

//delete a comment 

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  }).then((delComment) => {
    res.json(delComment);
  });
});

module.exports = router;