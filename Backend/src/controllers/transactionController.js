import Transaction from '../models/Transaction.js';

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  const { amount, type, category, description, date } = req.body;

  try {
    // Auto-categorization logic
    let finalCategory = category;
    const desc = description.toLowerCase();
    
    if (desc.includes('swiggy') || desc.includes('zomato')) {
      finalCategory = 'Food';
    } else if (desc.includes('uber') || desc.includes('ola')) {
      finalCategory = 'Travel';
    } else if (desc.includes('electricity') || desc.includes('recharge') || desc.includes('bill')) {
      finalCategory = 'Bills';
    } else if (desc.includes('amazon') || desc.includes('flipkart') || desc.includes('myntra')) {
      finalCategory = 'Shopping';
    } else if (desc.includes('salary') || desc.includes('bonus')) {
      finalCategory = 'Salary';
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      type,
      category: finalCategory || 'Other',
      description,
      date
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions (with filters)
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const { category, type, startDate, endDate } = req.query;
    
    // Build query object
    let query = { user: req.user._id };

    if (category) query.category = category;
    if (type) query.type = type;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if transaction belongs to user
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if transaction belongs to user
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await transaction.deleteOne();
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get transaction summary
// @route   GET /api/transactions/summary
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

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      categoryBreakdown: categoryStats.map(s => ({
        category: s._id,
        amount: s.total
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addTransaction, getTransactions, updateTransaction, deleteTransaction, getSummary };
