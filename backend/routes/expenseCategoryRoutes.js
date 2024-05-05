const router = require('express').Router();
const {getExpenseCategory,addExpenseCategory} = require("../controllers/expenseCategory")
const authenticateToken=require('../middleware/authMiddleware');


router.post("/add-expenseCategory", authenticateToken,addExpenseCategory)
    .get("/get-ExpenseCategory", authenticateToken,getExpenseCategory)


module.exports=router