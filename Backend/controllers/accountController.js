const Account = require('../models/Account');

exports.createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
        const msg = `[${new Date().toISOString()}] Account lookup failed in getAccountById - accountId: ${req.params.id}, ip: ${req.ip}\n`;
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
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.transferMoney = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    const sender = await Account.findById(fromAccountId);
    const receiver = await Account.findById(toAccountId);

    if (!sender || !receiver) {
      console.error(`[${new Date().toISOString()}] Account lookup failed in transferMoney - from: ${fromAccountId}, to: ${toAccountId}, body: ${JSON.stringify(req.body)}, ip: ${req.ip}`);
      return res.status(404).json({ message: 'Account not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient Balance' });
    }

    sender.balance -= Number(amount);
    receiver.balance += Number(amount);

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: 'Transfer Successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
