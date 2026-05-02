import fs from 'fs';
import csv from 'csv-parser';
import Transaction from '../models/Transaction.js';
import categorizeTransaction from '../utils/categorize.js';

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  const { amount, type, category, description, date } = req.body;

  if (!amount || !type || !description) {
    return res.status(400).json({
      success: false,
      message: 'Please provide amount, type, and description'
    });
  }

  try {
    // Auto-categorization logic if category is not provided or set to 'Other'
    let finalCategory = category;
    if (!finalCategory || finalCategory === 'Other') {
      finalCategory = categorizeTransaction(description);
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      type,
      category: finalCategory,
      description,
      date: date || Date.now()
    });

    res.status(201).json({
      success: true,
      message: 'Transaction added successfully',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all transactions (with filters and pagination)
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const { category, type, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    // Build query object
    let query = { user: req.user._id };

    if (category) query.category = category;
    if (type) query.type = type;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Transactions fetched successfully',
      data: {
        transactions,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Check if transaction belongs to user
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized'
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: updatedTransaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Check if transaction belongs to user
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized'
      });
    }

    await transaction.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Transaction removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload CSV file and parse transactions
// @route   POST /api/transactions/upload
// @access  Private
const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload a CSV file'
    });
  }

  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Basic validation and formatting
      const amount = parseFloat(data.amount);
      const type = data.type ? data.type.toLowerCase() : 'expense';
      const description = data.description || '';
      const category = data.category || categorizeTransaction(description);
      const date = data.date ? new Date(data.date) : new Date();

      if (!isNaN(amount)) {
        results.push({
          user: req.user._id,
          amount,
          type,
          category,
          description,
          date
        });
      }
    })
    .on('end', async () => {
      try {
        if (results.length > 0) {
          await Transaction.insertMany(results);
        }
        
        // Remove file after processing
        fs.unlinkSync(filePath);

        res.status(200).json({
          success: true,
          message: `${results.length} transactions uploaded successfully`,
          data: results
        });
      } catch (error) {
        fs.unlinkSync(filePath);
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    })
    .on('error', (error) => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      res.status(500).json({
        success: false,
        message: error.message
      });
    });
};

export { addTransaction, getTransactions, updateTransaction, deleteTransaction, uploadCSV };
