const express = require('express');
const { createShop, getShops, deleteShop, updateShop } = require('../controllers/shopController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createShop);     
router.get('/', authMiddleware, getShops);        
router.delete('/:id', authMiddleware, deleteShop);
router.put('/:id', authMiddleware, updateShop);   

module.exports = router;
