import express from 'express';
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
  uploadCsvMiddleware,
  uploadTransactionsCsv,
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/upload', uploadCsvMiddleware, uploadTransactionsCsv);
router.route('/').post(addTransaction).get(getTransactions);
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

export default router;
