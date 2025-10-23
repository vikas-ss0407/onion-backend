const express = require('express');
const { createBill, getBills } = require('../controllers/billController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createBill);   
router.get('/', authMiddleware, getBills);

module.exports = router;
