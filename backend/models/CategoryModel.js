const mongoose = require('mongoose');

const categorySchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        maxLength: 50
    },
})
module.exports = mongoose.model('category', categorySchema)