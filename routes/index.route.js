// import form home.route.js
const homeRouter= require('./home.route');
//import form product.route.js
const productRouter= require('./product.route');

module.exports.index=(app)=>{

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
    
}