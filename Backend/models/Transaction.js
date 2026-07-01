const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['Deposit', 'Withdraw'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // ✅ automatically sets current date
    },
    status: {
      type: String,
      default: 'Success', // ✅ useful for frontend display
    },
  },
  { timestamps: true } // ✅ adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Transaction', transactionSchema);
