import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const [totals, expensesByCategory, budgets] = await Promise.all([
      Transaction.aggregate([
        { $match: { userId } },
        { $group: { _id: '$type', total: { $sum: '$amount' } } },
      ]),
      Transaction.aggregate([
        { $match: { userId, type: 'expense' } },
        { $group: { _id: '$category', spent: { $sum: '$amount' } } },
      ]),
      Budget.find({ userId }),
    ]);

    const income = totals.find((item) => item._id === 'income')?.total || 0;
    const expense = totals.find((item) => item._id === 'expense')?.total || 0;
    const budgetMap = new Map(budgets.map((budget) => [budget.category, budget.limit]));

    const categoryBreakdown = expensesByCategory.map((item) => ({
      category: item._id,
      spent: item.spent,
      budget: budgetMap.get(item._id) || 0,
      remaining: (budgetMap.get(item._id) || 0) - item.spent,
    }));

    return res.json({
      success: true,
      message: 'Summary fetched successfully',
      data: {
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
        categoryBreakdown,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};
