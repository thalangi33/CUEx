//Model to interact with database
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//The schema of user
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    productId: [
        {
            type: [Schema.Types.ObjectId],
            ref: "Product"
        }
    ],
    loginStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    profileDescription: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)