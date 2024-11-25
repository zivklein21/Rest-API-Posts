const Posts = require('../models/post_model');

const newPost = async (req, res) => {
    const postBody = req.body;
    try {
      const post = await Posts.create(postBody);
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send(error.message);
    }
};

module.exports = {
    newPost
};