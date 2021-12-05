const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const postRoutes = require("./postController");
router.use("/post",postRoutes);

const commentRoutes = require("./commentController");
router.use("/comment",commentRoutes);

module.exports = router;