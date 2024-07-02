const express= require('express');
const router=express.Router();

const dashboardController=require('../../controllers/admin/dashboard.controller')
// router.get('/',(rep,res)=>{

//     // move into controller
//     res.render('client/pages/home/index')
    
// })
router.get('/',dashboardController.index)

module.exports=router;