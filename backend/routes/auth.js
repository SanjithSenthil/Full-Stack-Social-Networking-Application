const express = require("express");
const router = express.Router();
const User = require("../models/User")

// Register a User
router.post("/register", async (req,res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            about: req.body.about,
            personalityType: req.body.personalityType,
            interests: req.body.interests,
            lifestyle: req.body.lifestyle,
            aspirations: req.body.aspirations
        });
        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
});

// Login a User
router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        // User is not found
        if (!user) {
            return res.status(404).json("User is not found")
        }
        // Password is invalid
        if (user.password != req.body.password) {
            return res.status(400).json("Password is invalid")
        }
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router