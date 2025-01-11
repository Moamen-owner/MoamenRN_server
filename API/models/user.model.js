const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    userName: {
        type: String, 
        required: true,
        maxLength: 25,
        minLength: 2,
        split: " "
    },
    email: {
        type: String,
        unique: true,
        required: true,
        split: " "
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        split: " "
    },
    password: {
        type: String,
        required: true,
        maxLength: 45,
        minLength: 8,
        split: " "
    },
    orderHistory: {
        type: Array,
        default: [],
    }

})

const USER_MODEL = model("User", userSchema)
module.exports = USER_MODEL
