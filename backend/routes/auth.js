const express = require('express');
const { signup, login, updateProfile, getProfile, getUserFromToken, logout } = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.put('/update', getUserFromToken, updateProfile);
router.get('/profile', getUserFromToken, getProfile);

module.exports = router;
