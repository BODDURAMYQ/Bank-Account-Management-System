const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

exports.createTransaction = async (req, res) => {
    try {
        const { accountId, transactionType, amount } = req.body;

        const account = await Account.findById(accountId);

        if (!account) {
            const msg = `[${new Date().toISOString()}] Account lookup failed in createTransaction - accountId: ${accountId}, body: ${JSON.stringify(req.body)}, ip: ${req.ip}\n`;
            console.error(msg);
            try {
                const fs = require('fs');
                const logDir = __dirname + '/../logs';
                if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
                fs.appendFileSync(logDir + '/account-errors.log', msg);
            } catch (e) {
                console.error('Failed to write account error log:', e.message);
            }
            return res.status(404).json({ message: 'Account not found' });
        }

        if (transactionType === 'Deposit') {
            account.balance += amount;
        } else if (transactionType === 'Withdraw') {
            if (account.balance < amount) {
                return res.status(400).json({ message: 'Insufficient Balance' });
            }
            account.balance -= amount;
        } else {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        await account.save();

        const transaction = await Transaction.create({
            accountId,
            transactionType,
            amount
        });

        res.status(201).json(transaction);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('accountId');

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};