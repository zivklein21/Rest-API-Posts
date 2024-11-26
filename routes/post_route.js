const express = require("express");
const router = express.Router();
const postsController = require("../controllers/post_controller");

router.post("/newPost", postsController.newPost);

router.get("/post/:id", postsController.getPostById);


module.exports = router;