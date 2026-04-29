import Budget from '../models/Budget.js';

export const setBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    if (!category || limit === undefined) {
      return res.status(400).json({ success: false, message: 'Category and limit are required', data: null });
    }

    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id, category },
      { userId: req.user._id, category, limit },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({
      success: true,
      message: 'Budget saved successfully',
      data: budget,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id }).sort({ category: 1 });
    return res.json({ success: true, message: 'Budgets fetched successfully', data: budgets });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};
