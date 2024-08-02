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

const logout=require('./logout.route')

const account=require('./account.route')

const profile=require('./profile.route')

const setting=require('./setting.route')

const check=require(`../../middlewares/admin/auth.middlewares`)
module.exports.index=(app)=>{

    const path = `/${systemConfig.prefixAdmin}`;

    // app.get('/',(rep,res)=>{
    //     res.render('client/pages/home/index')
    // })
    // move to home.route.js
    
    // app.use('/admin/dashboard',(adminRoute));

    app.use(`${path}/dashboard`,check, adminRoute);


    // app.get('/products',(req,res)=>{
    //     res.render('client/pages/product/index')
    // })
    // move to product.route.js


    // app.use('/admin/products' ,productRoute);

    app.use(`${path}/products`,check, productRoute);


    
    app.use(`${path}/deleted`,check, trashRoute)


    app.use(`${path}/products-category`,check,category)


    app.use(`${path}/role`,check,role)


    app.use(`${path}/permission`,check,permissions)


    app.use(`${path}/account`,check,account)

    app.use(`${path}/auth`,auth)

    app.use(`${path}/logout`,logout)

    app.use(`${path}/profile`,check, profile)


    app.use(`${path}/settings`,check,setting)
}