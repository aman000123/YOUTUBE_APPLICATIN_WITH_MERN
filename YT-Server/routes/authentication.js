const express = require('express');
const router = express.Router();

const { signup, signin, googleAuth } = require('../Controllers/auth')

/* GET users listing. */
//router.get('/', auth);

//create user

router.post('/signup', signup);

//sign in/ login

router.post('/signin', signin);

//google authentication

router.post('/google', googleAuth);

module.exports = router;
