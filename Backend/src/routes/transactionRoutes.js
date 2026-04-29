import express from 'express';
import { 
  addTransaction, 
  getTransactions, 
  updateTransaction, 
  deleteTransaction,
  getSummary
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes in this module are protected

router.get('/summary', getSummary);

router.route('/')
  .post(addTransaction)
  .get(getTransactions);

router.route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

export default router;
