const express = require('express');
const { handleSignUp, handleSignIn, handleClearCookie } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.post('/clear-cookie', handleClearCookie);

module.exports = router;