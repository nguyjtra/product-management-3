 const express=require('express');
 const router=express.Router();
 
 //import controller
 const controller=require('../controllers/client/product.controller')

//  router.get('/',(req,res)=>{
//         res.render('client/pages/product/index')

//         // move into controller (product.controller.js)
//     })

    router.get('/',controller.index)

    router.get('/detail/:slug',controller.detail)

    router.get('/menu/:slug',controller.menu)

    

module.exports=router;