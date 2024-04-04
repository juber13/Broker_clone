const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const validator = require('validator')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique : [true , "firstName is already in used"]
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        validate: validator.isEmail
    },

    phone: {
        type: Number,
        required: true,
        maxLen: [10, "max len should be 10"]
    },

    password: {
        type: String,
        required: true,
        maxLen: [8, "password character lenth should be 8 character or long"]
    },
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcrypt.hashSync(this.password, 10)
    } catch (err) {
        console.log(err);
    }

})

module.exports = mongoose.model('User', userSchema)

