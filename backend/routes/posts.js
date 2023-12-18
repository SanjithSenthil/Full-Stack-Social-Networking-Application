const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create a Post
router.post("/create", async (req,res) => {
    try {
        const newPost = new Post(req.body);
        const post = await newPost.save();
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get a Post
router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Update a Post
router.put("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId == post.userId) {
            await post.updateOne({$set: req.body});
            return res.status(200).json("Post has been updated");
        }
        else {
            return res.status(403).json("You can only update your post");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// Delete a Post
router.delete("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId == post.userId) {
            await post.deleteOne();
            return res.status(200).json("Post has been deleted");
        }
        else {
            return res.status(403).json("You can only delete your post");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// Like a Post
router.put("/:id/like", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: { likes: req.body.userId }});
            res.status(200).json("The post has been liked");
          } else {
            await post.updateOne({$pull: { likes: req.body.userId }});
            res.status(200).json("The post has been unliked");
          }
    } catch(err) {
        res.status(500).json(err);
    }
});

// Dislike a Post
router.put("/:id/dislike", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.dislikes.includes(req.body.userId)) {
            await post.updateOne({$push: { dislikes: req.body.userId }});
            res.status(200).json("The post has been disliked");
          } else {
            await post.updateOne({$pull: { dislikes: req.body.userId }});
            res.status(200).json("The post has been undisliked");
          }
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get all Posts of a User
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id }); 
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all Feed Posts of a User (User Posts + Following Posts)
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const followingPosts = await Promise.all(
        currentUser.following.map((followingId) => {
          return Post.find({ userId: followingId });
        })
      );
      res.status(200).json(userPosts.concat(...followingPosts))
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router