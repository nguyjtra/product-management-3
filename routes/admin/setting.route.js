const express= require('express');
const router=express.Router();
const multer  = require('multer')
const controller=require('../../controllers/admin/setting.controller')

const storage=require('../../helpers/storage.helper')
const img=require('../../middlewares/admin/uploadCloud')
const upload = multer()

const validate=require('../../validates/admin/product.validate')


router.get('/general',controller.setting)

router.patch('/general', upload.single('logo'),img.cloud,controller.Setting)

module.exports=router