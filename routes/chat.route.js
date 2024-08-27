const express= require('express');
const router=express.Router();


controller=require('../controllers/client/chat.controller')

router.get('/',controller.index)

module.exports=router