const userModel = require('../models/user.model')

const signUp = async (req, res) => {
    const { firstName, lastName, email, password, phone, f } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const newUser = await userModel.create({ firstName, lastName, email, password, phone })
        res.status(201).json({
            success: true,
            message: "User sign up successfully",
            user: newUser
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }



}

module.exports = signUp;