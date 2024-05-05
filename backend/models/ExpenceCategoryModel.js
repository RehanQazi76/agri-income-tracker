const mongoose = require('mongoose');

const expenseCategorySchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        maxLength: 50
    },
})
module.exports = mongoose.model('expenseCategory', expenseCategorySchema)