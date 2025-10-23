const express = require('express');
const { signup, login, updateProfile, getProfile, getUserFromToken, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.use(getUserFromToken);
router.put('/update', updateProfile);
router.get('/profile', getProfile);

module.exports = router;
