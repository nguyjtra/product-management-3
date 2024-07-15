const express= require('express');
const router=express.Router();
const multer  = require('multer')
const categoryController=require('../../controllers/admin/category.controller')



const storage=require('../../helpers/storage.helper')
const img=require('../../middlewares/admin/uploadCloud')
const upload = multer()

const validate=require('../../validates/admin/product.validate')

router.get('/',categoryController.index)

router.get('/create',categoryController.displayAddnew)

router.post('/addNew', upload.single('thumbnail'), img.cloud, validate.creat,categoryController.creat)

router.get('/Preview/:id',categoryController.edit_display)

router.patch('/edit/:id', upload.single('thumbnail'), img.cloud, validate.creat,categoryController.edit)

router.patch('/deleteForever/:id',categoryController.delete)

module.exports=router;