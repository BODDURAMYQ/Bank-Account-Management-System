const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

exports.createTransaction = async (req, res) => {
  try {
    const { accountId, transactionType, amount } = req.body;

    const account = await Account.findById(accountId);
    if (!account) {
      const msg = `[${new Date().toISOString()}] Account lookup failed in createTransaction - accountId: ${accountId}, body: ${JSON.stringify(req.body)}, ip: ${req.ip}\n`;
      console.error(msg);
      try {
        const fs = require("fs");
        const logDir = __dirname + "/../logs";
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
        fs.appendFileSync(logDir + "/account-errors.log", msg);
      } catch (e) {
        console.error("Failed to write account error log:", e.message);
      }
      return res.status(404).json({ message: "Account not found" });
    }

    if (transactionType === "Deposit") {
      account.balance += amount;
    } else if (transactionType === "Withdraw") {
      if (account.balance < amount) {
        return res.status(400).json({ message: "Insufficient Balance" });
      }
      account.balance -= amount;
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    await account.save();

    const transaction = await Transaction.create({
      accountId,
      userId: req.user.id,   // ✅ link transaction to logged-in user
      transactionType,
      amount,
      date: new Date(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Return only transactions for the logged-in user's accounts
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // comes from authMiddleware

    // find all accounts belonging to this user
    const accounts = await Account.find({ userId }).select("_id");
    const accountIds = accounts.map(acc => acc._id);

    // fetch only transactions linked to those accounts
    const transactions = await Transaction.find({ accountId: { $in: accountIds } })
      .populate("accountId")
      .sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
