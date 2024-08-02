const express= require('express');
const router=express.Router();
const multer  = require('multer')
const profileController=require('../../controllers/admin/profile.controller')

const storage=require('../../helpers/storage.helper')
const img=require('../../middlewares/admin/uploadCloud')
const upload = multer()

const validate=require('../../validates/admin/product.validate')

router.get('/', profileController.index)


module.exports=router