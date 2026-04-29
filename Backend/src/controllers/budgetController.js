import Budget from '../models/Budget.js';

// @desc    Set or update budget
// @route   POST /api/budget
// @access  Private
const setBudget = async (req, res) => {
  const { category, limit } = req.body;

  try {
    // Check if budget already exists for this category
    let budget = await Budget.findOne({ user: req.user._id, category });

    if (budget) {
      budget.limit = limit;
      await budget.save();
      return res.json(budget);
    }

    budget = await Budget.create({
      user: req.user._id,
      category,
      limit,
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all budgets for user
// @route   GET /api/budget
// @access  Private
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { setBudget, getBudgets };
