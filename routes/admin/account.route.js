
const express= require('express');
const router=express.Router();
const multer  = require('multer')
const accountController=require('../../controllers/admin/account.controller')

const storage=require('../../helpers/storage.helper')
const img=require('../../middlewares/admin/uploadCloud')
const upload = multer()

const validate=require('../../validates/admin/product.validate')

router.get('/',accountController.index)


router.get('/creat', accountController.creat)

router.post('/createAccount',upload.single('avatar'), img.cloud, accountController.creatAccount)

router.get(`/edit/:id`, accountController.edit)

router.post(`/editAccount/:id`,upload.single('avatar'), img.cloud,accountController.editt)

router.get(`/delete/:id`,upload.single('avatar'), img.cloud,accountController.delete)


module.exports=router