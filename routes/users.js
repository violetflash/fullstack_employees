const express = require('express');
const router = express.Router();

// api/user/login
router.post('/login', );

router.post('/register', function(req, res) {
  res.send('register');
});

router.get('/profile', function(req, res) {
  res.send('profile');
});

module.exports = router;
