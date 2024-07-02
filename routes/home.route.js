const express= require('express');
const router=express.Router();

const homeController=require('../controllers/client/home.controller')
// router.get('/',(rep,res)=>{

//     // move into controller
//     res.render('client/pages/home/index')
    
// })
router.get('/',homeController.index)

module.exports=router;