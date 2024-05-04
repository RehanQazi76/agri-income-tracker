const categorySchema = require("../models/CategoryModel")

exports.addCategory= async (req, res)=>{
    const {name} = req.body
    const category =  categorySchema({
        name
    })
    try {
        
        if(!name)return res.status(400).json({message: 'All fields are required!'})
        await category.save()
        res.status(200).json({category})
    } catch (error) {
        res.status(500).json({
            status: "fail",
            errors: error.message
        })
    }
    console.log(category)
}

exports.getCategory= async(req, res)=>{
    try {
        const category = await categorySchema.find()
        res.status(200).json({  category        })
    } catch (error) {
        res.status(400).json({errors: error.message
        })
    }
}
