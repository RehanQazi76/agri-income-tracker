const router = require('express').Router();
const cors= require("cors");
const { registerUser, loginUser,getProfile } = require('../controllers/user');


// router.use(
//     cors({
//         credentials:true,
//         origin: 'http://localhost:4000'    
// }))



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/profile', getProfile);

module.exports=router;