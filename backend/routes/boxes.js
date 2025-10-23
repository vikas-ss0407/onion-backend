const express = require('express');
const { createBox, getBoxes, updateBox, deleteBox, updateAlert } = require('../controllers/boxController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createBox);
router.get('/', authMiddleware, getBoxes);
router.put('/:id', authMiddleware, updateBox);
router.delete('/:id', authMiddleware, deleteBox);

// New route for alert update
router.put('/:id/alert', authMiddleware, updateAlert);

module.exports = router;
