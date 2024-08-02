const express= require('express');
const router=express.Router();

let logoutController=require('../../controllers/admin/logout.controller')

router.get('/',logoutController.index)

module.exports=router