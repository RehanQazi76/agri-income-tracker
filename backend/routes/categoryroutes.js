const router = require('express').Router();
const {getCategory,addCategory} = require("../controllers/category")



router.post("/add-category", addCategory)
    .get("/get-category", getCategory)


module.exports=router