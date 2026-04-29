import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Please specify if it is an income or expense'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Food', 'Travel', 'Bills', 'Shopping', 'Salary', 'Investment', 'Other'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
