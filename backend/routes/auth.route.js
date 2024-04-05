const express = require('express');

const router = express.Router();

const { signUp, signIn , signInWithGoogle } = require('../controllers/auth.controller')



router.post('/register', signUp);
router.post('/login', signIn);
router.post('/google', signInWithGoogle);


module.exports = router;