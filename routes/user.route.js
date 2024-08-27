const express= require('express');
const router=express.Router();
const userMiddleware=require('../middlewares/client/user')

controller=require('../controllers/client/user.controller')
router.get('/register',controller.register)


router.post('/creatAccount',controller.creatAccount)


router.get('/login',controller.login)

router.post('/login',controller.Login)

router.get('/logout',controller.logout)

router.get('/password/forgot',controller.forgot)

router.post('/password/forgot',controller.Forgot)

router.get('/password/otp', controller.otp)

router.post('/password/otp',controller.Otp)

router.get('/password/reset', controller.reset)

router.post('/password/reset',controller.resetP)


router.get('/profile',userMiddleware.requireAuth,controller.profile)

module.exports=router