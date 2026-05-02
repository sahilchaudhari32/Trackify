import Budget from '../models/Budget.js';

// @desc    Set or update budget
// @route   POST /api/budget
// @access  Private
const setBudget = async (req, res) => {
  const { category, limit } = req.body;

  try {
    if (!category || typeof limit !== 'number' || Number.isNaN(limit) || limit < 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid category and non-negative limit'
      });
    }

    // Check if budget already exists for this category
    let budget = await Budget.findOne({ user: req.user._id, category });

    if (budget) {
      budget.limit = limit;
      await budget.save();
      return res.status(200).json({
        success: true,
        message: 'Budget updated successfully',
        data: budget
      });
    }

    budget = await Budget.create({
      user: req.user._id,
      category,
      limit,
    });

    res.status(201).json({
      success: true,
      message: 'Budget set successfully',
      data: budget
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all budgets for user
// @route   GET /api/budget
// @access  Private
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      message: 'Budgets fetched successfully',
      data: budgets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { setBudget, getBudgets };
