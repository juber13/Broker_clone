const userModel = require('../models/user.model');
const errorHandler = require('../utills/error');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const signUp = async (req, res, next) => {
    const { email, password, name } = req.body;

    try {
        const newUser = await userModel.create({ name, email, password })
        res.status(201).json({
            success: true,
            message: "User sign up successfully",
            user: newUser
        })

    } catch (err) {
        next(err)
    }
}


const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    const validUser = await userModel.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not Found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) return next(401, "Wron credentials");

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
}

module.exports = { signUp, signIn };