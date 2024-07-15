// import form home.route.js
const adminRoute= require('./dashboard.route');

const productRoute=require('./product.route');

const trashRoute=require('./trash.route')
//import config system.js
const systemConfig = require("../../config/system");

const category=require('./category.route')

const role=require('./role.route')

const permissions=require('./permission.route')

const auth=require('./auth.route')

const account=require('./account.route')
module.exports.index=(app)=>{

    const path = `/${systemConfig.prefixAdmin}`;

    // app.get('/',(rep,res)=>{
    //     res.render('client/pages/home/index')
    // })
    // move to home.route.js
    
    // app.use('/admin/dashboard',(adminRoute));

    app.use(`${path}/dashboard`, adminRoute);


    // app.get('/products',(req,res)=>{
    //     res.render('client/pages/product/index')
    // })
    // move to product.route.js


    // app.use('/admin/products' ,productRoute);

    app.use(`${path}/products`, productRoute);


    
    app.use(`${path}/deleted`, trashRoute)


    app.use(`${path}/products-category`,category)


    app.use(`${path}/role`,role)


    app.use(`${path}/permission`,permissions)


    app.use(`${path}/account`,account)

    app.use(`${path}/auth`,auth)

    
}