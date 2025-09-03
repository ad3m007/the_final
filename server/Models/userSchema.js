const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true
     },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User