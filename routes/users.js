const express = require('express');
const {login, register, profile} = require("./controllers/users");
const {auth} = require("../middleware/auth");
const router = express.Router();

// api/user/login
router.post('/login', login);

router.post('/register', register);

router.get('/profile', auth, profile);

module.exports = router;
