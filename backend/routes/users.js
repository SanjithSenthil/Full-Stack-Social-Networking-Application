const express = require("express");
const router = express.Router();
const User = require("../models/User")

// Get a User
router.get("/", async(req,res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        if (userId) {
            const user = await User.findById(userId);
            res.status(200).json(user);
        }
        else if (username) {
            const user = await User.findOne({username: username});
            res.status(200).json(user);
        }
    } catch(err) {
        return res.status(500).json(err);
    }
});

// Update a User
router.put("/:id", async(req,res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("Account has been updated");
        } catch(err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can only update your account");
    }
});

// Delete a User
router.delete("/:id", async(req,res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch(err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can only delete your account");
    }
});

// Get all Followers of a User
router.get("/followers/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const followers = await Promise.all(
        user.followers.map((followerId) => {
          return User.findById(followerId);
        })
      );
      let followersList = [];
      followers.map((follower) => {
        const { _id, username, profilePicture } = follower;
        followersList.push({ _id, username, profilePicture });
      });
      res.status(200).json(followersList)
    } catch (err) {
      res.status(500).json(err);
    }
});

// Get all Following of a User
router.get("/following/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const followings = await Promise.all(
        user.following.map((followingId) => {
          return User.findById(followingId);
        })
      );
      let followingList = [];
      followings.map((following) => {
        const { _id, username, profilePicture } = following;
        followingList.push({ _id, username, profilePicture });
      });
      res.status(200).json(followingList)
    } catch (err) {
      res.status(500).json(err);
    }
});

// Follow a User
router.put("/follow/:id", async(req,res) => {
    if (req.body.userId != req.params.id) {
        try {
            const currentUser = await User.findById(req.body.userId);
            const user = await User.findById(req.params.id);
            if (!currentUser.following.includes(req.params.id)) {
                await currentUser.updateOne({ $push: { following: req.params.id } });
                await user.updateOne({ $push: { followers: req.body.userId } });
                res.status(200).json("User has been followed");
            }
            else {
                res.status(403).json("You already follow this user");
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You cannot follow yourself");
    }
});

// Unfollow a User
router.put("/unfollow/:id", async(req,res) => {
    if (req.body.userId != req.params.id) {
        try {
            const currentUser = await User.findById(req.body.userId);
            const user = await User.findById(req.params.id);
            if (currentUser.following.includes(req.params.id)) {
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                await user.updateOne({ $pull: { followers: req.body.userId } });
                res.status(200).json("User has been unfollowed");
            }
            else {
                res.status(403).json("You already don't follow this user");
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You cannot unfollow yourself");
    }
});

module.exports = router