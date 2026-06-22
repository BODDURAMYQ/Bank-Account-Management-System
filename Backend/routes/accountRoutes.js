const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
    transferMoney
} = require('../controllers/accountController');

// Public endpoints (e.g., create account) can remain public if desired
router.post('/', createAccount);

// Protect read/update/delete operations with JWT
router.get('/', authMiddleware, getAccounts);
router.post('/transfer', authMiddleware, transferMoney);
router.get('/:id', authMiddleware, getAccountById);
router.put('/:id', authMiddleware, updateAccount);
router.delete('/:id', authMiddleware, deleteAccount);

module.exports = router;