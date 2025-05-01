const express = require('express');
const router = express.Router();
const { createBill, getBills, getBill, getBillShares, settleBill } = require('../controllers/billController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createBill);
router.get('/', protect, getBills); // Get all bills
router.get('/:billId', protect, getBill); // Get a specific bill
router.get('/:billId/shares', protect, getBillShares); // Get bill shares
router.put('/:billId/settle', protect, settleBill);

module.exports = router;

