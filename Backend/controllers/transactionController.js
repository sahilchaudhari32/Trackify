import csvParser from 'csv-parser';
import fs from 'fs';
import multer from 'multer';
import Transaction, { categories } from '../models/Transaction.js';
import categorizeTransaction from '../utils/categorize.js';

fs.mkdirSync('uploads', { recursive: true });

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.toLowerCase().endsWith('.csv')) {
      return cb(null, true);
    }
    return cb(new Error('Only CSV files are allowed'));
  },
});

const parseTransactionPayload = (payload) => {
  const amount = Number(payload.amount);
  const type = payload.type;
  const description = `${payload.description || ''}`.trim();
  const category = categories.includes(payload.category)
    ? payload.category
    : categorizeTransaction(description, 'Other');
  const date = payload.date ? new Date(payload.date) : new Date();

  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: 'Amount must be a positive number' };
  }

  if (!['income', 'expense'].includes(type)) {
    return { error: 'Type must be income or expense' };
  }

  if (!description) {
    return { error: 'Description is required' };
  }

  if (Number.isNaN(date.getTime())) {
    return { error: 'Date must be valid' };
  }

  return { value: { amount, type, description, category, date } };
};

export const uploadCsvMiddleware = upload.single('file');

export const addTransaction = async (req, res) => {
  try {
    const parsed = parseTransactionPayload(req.body);
    if (parsed.error) {
      return res.status(400).json({ success: false, message: parsed.error, data: null });
    }

    const transaction = await Transaction.create({ ...parsed.value, userId: req.user._id });
    return res.status(201).json({ success: true, message: 'Transaction added successfully', data: transaction });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;
    const query = { userId: req.user._id };

    if (req.query.category) query.category = req.query.category;
    if (req.query.type) query.type = req.query.type;
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) query.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.date.$lte = new Date(req.query.endDate);
    }

    const [transactions, total] = await Promise.all([
      Transaction.find(query).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit),
      Transaction.countDocuments(query),
    ]);

    return res.json({
      success: true,
      message: 'Transactions fetched successfully',
      data: {
        items: transactions,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const existing = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Transaction not found', data: null });
    }

    const mergedPayload = {
      amount: req.body.amount ?? existing.amount,
      type: req.body.type ?? existing.type,
      category: req.body.category ?? existing.category,
      description: req.body.description ?? existing.description,
      date: req.body.date ?? existing.date,
    };
    const parsed = parseTransactionPayload(mergedPayload);
    if (parsed.error) {
      return res.status(400).json({ success: false, message: parsed.error, data: null });
    }

    Object.assign(existing, parsed.value);
    await existing.save();

    return res.json({ success: true, message: 'Transaction updated successfully', data: existing });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found', data: null });
    }

    return res.json({ success: true, message: 'Transaction deleted successfully', data: transaction });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const uploadTransactionsCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'CSV file is required', data: null });
  }

  const transactions = [];
  const errors = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (row) => {
          const parsed = parseTransactionPayload(row);
          if (parsed.error) {
            errors.push({ row, error: parsed.error });
            return;
          }
          transactions.push({ ...parsed.value, userId: req.user._id });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    const inserted = transactions.length ? await Transaction.insertMany(transactions) : [];
    return res.status(201).json({
      success: true,
      message: 'CSV processed successfully',
      data: { insertedCount: inserted.length, skippedCount: errors.length, errors },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  } finally {
    fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
  }
};
