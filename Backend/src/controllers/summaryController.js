import Transaction from '../models/Transaction.js';

// @desc    Get financial summary
// @route   GET /api/summary
// @access  Private
const getSummary = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);

    const categoryStats = await Transaction.aggregate([
      { $match: { user: req.user._id, type: 'expense' } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    const income = stats.find(s => s._id === 'income')?.total || 0;
    const expense = stats.find(s => s._id === 'expense')?.total || 0;

    res.status(200).json({
      success: true,
      message: 'Summary fetched successfully',
      data: {
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
        categoryBreakdown: categoryStats.map(s => ({
          category: s._id,
          amount: s.total
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { getSummary };
