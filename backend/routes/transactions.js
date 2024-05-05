const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const authenticateToken=require('../middleware/authMiddleware');
const router = require('express').Router();


router.post('/add-income', authenticateToken,addIncome)
    .get('/get-incomes', authenticateToken,getIncomes)
    .delete('/delete-income/:id',authenticateToken, deleteIncome)
    .post('/add-expense',authenticateToken, addExpense)
    .get('/get-expenses',authenticateToken, getExpense)
    .delete('/delete-expense/:id',authenticateToken, deleteExpense)

module.exports = router