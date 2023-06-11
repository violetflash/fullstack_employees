const express = require('express');
const {loginUser, registerUser, getUserProfile} = require("./controllers/users");
const {checkAuthMiddleware} = require("../middleware/auth");
const router = express.Router();

// api/user/login
router.post('/login', loginUser);

router.post('/register', registerUser);

router.get('/profile', checkAuthMiddleware, getUserProfile);

module.exports = router;
