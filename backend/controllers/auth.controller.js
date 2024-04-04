const userModel = require('../models/user.model');
const errorHandler = require('../utills/error');

const signUp = async (req, res, next) => {
    const { firstName, lastName, email, password, phone, f } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }

    if(password.length < 8){
        return errorHandler(500 , "password length should be eight character")
    }

    try {
        const newUser = await userModel.create({ firstName, lastName, email, password, phone })
        res.status(201).json({
            success: true,
            message: "User sign up successfully",
            user: newUser
        })

    } catch (err) {
        next(err)
    }



}

module.exports = signUp;