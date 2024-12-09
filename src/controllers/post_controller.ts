import Posts from "../models/post_model";
import { Request, Response } from "express";

const newPost = async (req: Request, res: Response) => {
    const postBody = req.body;
    try {
      const post = await Posts.create(postBody);
      return res.status(201).send(post);
    } catch (error) {
      return res.status(400).send(error.message);
    }
};

const getPostById = async (req: Request, res: Response) => {
    const postId = req.params.id;
  
    try {
      const post = await Posts.findById(postId);
      if (post) {
        return res.send(post);
      } else {
        return res.status(404).send("Post not found");
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };

  const getAllPosts = async (req: Request, res: Response) => {
    const filter = req.query.owner;
    try {
      if (filter) {
        const posts = await Posts.find({ owner: filter });
        return res.send(posts);
      } else {
        const posts = await Posts.find();
        res.send(posts);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const getPostBySender = async (req: Request, res: Response) => {
    const { sender } = req.query;
  
    try {
      const posts = await Posts.find({ owner: sender });
      if (posts) {
        res.send(posts);
      } else {
        res.status(404).send("Sender not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const updatePostContent = async (req: Request, res: Response) => {
    const postId = req.params.id; 
    const { content } = req.body; 
  
    try {
      const updatedPost = await Posts.findByIdAndUpdate(
        postId,
        { content }, 
        { new: true, runValidators: true } 
      );
  
      if (updatedPost) {
        res.send(updatedPost);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };


export default {
  newPost,
  getPostById,
  getAllPosts,
  getPostBySender,
  updatePostContent
};