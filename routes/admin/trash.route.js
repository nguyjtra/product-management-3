const express= require('express');
const router=express.Router();

let trashController=require('../../controllers/admin/trash.controller')


router.get('/',trashController.index)


router.patch('/reverse/:id',trashController.reverse)


router.patch('/reverseMany',trashController.reverseMany)
module.exports=router