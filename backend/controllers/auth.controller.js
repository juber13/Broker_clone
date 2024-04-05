const User = require('../models/user.model');
const errorHandler = require('../utills/error');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};



const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


const signInWithGoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie('access-token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const genratePasswond = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(genratePasswond, 10);
      const newName = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
      const newUser = new User({ name: newName, password: hashedPassword, email: req.body.email, avatar: req.body.photo })
      await newUser.save();

      const { password: pass, ...rest } = newUser._doc

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res.cookie('access-token', token, { httpOnly: true }).status(200).json(rest)
      console.log(genratePasswond)
    }

  } catch (error) {
    next(error)
  }
}

module.exports = { signUp, signIn, signInWithGoogle };