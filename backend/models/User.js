const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    },
    personalityType: {
        type: String,
        default: "Personality type not specified"
    },
    interests: {
        type: String,
        default: "Interests not specified"
    },
    lifestyle: {
        type: String,
        default: "Lifestyle details not provided"
    },
    aspirations: {
        type: String,
        default: "Aspirations not specified"
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema)
