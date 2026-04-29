import mongoose from 'mongoose';
import { categories } from './Transaction.js';

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: categories.filter((category) => category !== 'Salary'),
      required: true,
    },
    limit: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

export default mongoose.model('Budget', budgetSchema);
