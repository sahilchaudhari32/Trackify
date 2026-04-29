import mongoose from 'mongoose';

export const categories = [
  'Food',
  'Travel',
  'Bills',
  'Shopping',
  'Salary',
  'Investment',
  'Health',
  'Entertainment',
  'Other',
];

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, enum: categories, required: true },
    description: { type: String, required: true, trim: true, maxlength: 200 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
