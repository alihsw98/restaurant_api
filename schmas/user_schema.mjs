import mongoose from "mongoose";

const userScheam = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: ""
    }
})

const User = mongoose.model("User", userScheam)

export default User;