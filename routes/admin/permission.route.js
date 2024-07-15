const express= require('express');
const router=express.Router();
const permissionController=require('../../controllers/admin/permission.controller')

router.get('/',permissionController.index)

router.patch('/Update',permissionController.Update)

module.exports=router