const express= require('express');
const router=express.Router();


//upload picture
const multer  = require('multer')



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
      
//       cb(null,  `${Date.now()}-${file.originalname}`)
//     }
//   })
  


const storage=require('../../helpers/storage.helper')

const upload = multer({ storage: storage.storage})

const productController=require('../../controllers/admin/product.controller')
// router.get('/',(rep,res)=>{

//     // move into controller
//     res.render('client/pages/home/index')
    
// })

const validate=require('../../validates/admin/product.validate')


router.get('/',productController.index)


router.patch('/changeStatus/:status/:id',productController.changeStatus)


router.post('/addNew', upload.single('thumbnail'),validate.creat ,productController.creat)

// router.patch('/edit/:id', upload.single('thumbnail'),validate.creat ,productController.editPatch)

router.patch('/multichange',productController.multichange)


router.patch('/delete',productController.deleteItem)


router.patch('/position/:value/:id',productController.position)


router.get('/create',productController.addNew)


// router.post('/addNew', upload.single('thumbnail'),validate.creat ,productController.creat)


router.get('/Preview/:id',productController.edit)


router.patch('/edit/:id', upload.single('thumbnail'),validate.creat ,productController.editPatch)


module.exports=router;