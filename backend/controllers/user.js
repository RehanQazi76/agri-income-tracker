const userSchema = require('../models/userModel');
const { comparePassword,hashPassword}= require("../helper/auth");
const jwt= require('jsonwebtoken');
const cookieParser= require('cookie-parser')


const registerUser= async(req,res)=>{
    try {
        const{userName, email, password}= req.body;
        if(!userName){
            return res.json({
                error:"username required"
            })
        }
        //check passs
        if(!password || password.length<=6){
            return res.json({
                error: "password length must be atleast 6 characters"
            })
        }
        

        //check email
        const exists=await userSchema.findOne({email});
        if(exists){
            return res.json({
                error:"email already exists"
            });
        }
        let hashedpass= await hashPassword(password);
        console.log(hashedpass);
        // create user
        const user= new userSchema({
            userName,
            email,
            password:hashedpass,
        });
        await user.save();
        // create token
        // const getuser= await userSchema.findOne({email});
        // const token = jwt.sign({email:getuser.email, id:getuser._id,userName: getuser.userName},process.env.JWT_SECRET,{expiresIn:"24h"} )
        // return (
        //     token,
        //     (res.json({
        //     message:"user created successfully"
        // })))

    } catch (error) {
        console.log(error)
    }

}
// login user end point

const loginUser= async (req, res)=>{
    try {
        const{email,password}=req.body;

        const user= await userSchema.findOne({email});

        if(!user){
            return res.json({
                error:"user not found"
            })
        }
        // check if match
        const match =await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
                if (err) {
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                res.cookie('token', token, { httpOnly: true, maxAge: 86400 }).json({ message: "Passwords match", user: { email: user.email, id: user._id, userName: user.userName } });
            });
        } else {
            return res.status(400).json({ error: "Passwords do not match" });
        }
    } catch (error) {
        
    }
}

const getProfile= async(req, res)=>{
const{token} =req.cookieParser;
if(token){
    jwt.verify(token, process.env.JWT_SECRET,{},(err,user)=>{
        if(err)throw err;
        res.json(user);

    })

}
else res.json(null);
}

module.exports={registerUser, loginUser,getProfile}