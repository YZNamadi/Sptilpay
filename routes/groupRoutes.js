const express = require('express');
const router = express.Router();
const { createGroup, addMember } = require('../controllers/groupController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createGroup);
router.post('/add-member', protect, addMember);

module.exports = router;

