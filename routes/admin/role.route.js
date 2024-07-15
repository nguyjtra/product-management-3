const express= require('express');
const router=express.Router();

const roleController=require('../../controllers/admin/role.controller')


router.get('/',roleController.index)

router.get('/displayAdd',roleController.DisplayAdd)

router.post('/create',roleController.creat)

router.get('/displayEdit/:id',roleController.DisplayEdit)

router.patch('/edit/:id',roleController.edit)

router.get('/delete/:id',roleController.delete)

module.exports=router;