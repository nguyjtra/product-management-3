// import form home.route.js
const homeRouter= require('./home.route');
//import form product.route.js
const productRouter= require('./product.route');
const category= require('../middlewares/client/category')
const SearchRouter=require('./search.route')
const cart=require('../middlewares/client/cart')
const cartRouter=require('./cart.route')
const outRouter=require('./outRouter')
const userRouter=require('./user.route')
const user=require('../middlewares/client/user')
const setting=require('../middlewares/client/setting')
const chatRouter=require('./chat.route')
const userMiddleware=require('../middlewares/client/user')
const usersRouter=require('./users.route')
module.exports.index=(app)=>{

    app.use(cart)


    app.use(category)

    app.use(setting)

    app.use(user.info)
    // app.get('/',(rep,res)=>{
    //     res.render('client/pages/home/index')
    // })
    // move to home.route.js
    
    app.use('/',(homeRouter));

    // app.get('/products',(req,res)=>{
    //     res.render('client/pages/product/index')
    // })
    // move to product.route.js

    app.use('/products',productRouter);
    
    app.use('/search',SearchRouter)

    app.use('/cart',cartRouter)

    app.use('/checkout', outRouter)

    app.use('/user',userRouter)

    app.use('/users',userMiddleware.requireAuth,usersRouter)


    app.use('/chat',userMiddleware.requireAuth,chatRouter)


    
}