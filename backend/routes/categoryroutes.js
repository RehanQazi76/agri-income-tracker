const router = require('express').Router();
const {getCategory,addCategory} = require("../controllers/category")
const authenticateToken=require('../middleware/authMiddleware');


router.post("/add-category", authenticateToken,addCategory)
    .get("/get-category", authenticateToken,getCategory)


module.exports=router