const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const validator = require('validator')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: "https://lh3.googleusercontent.com/a/ACg8ocKyvObcTWed4igqy7bHKhIHqxLmV4IqGJlexmNoWQm0lCqku6E=s360-c-no"
    }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema)

