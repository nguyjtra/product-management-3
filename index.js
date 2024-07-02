
//import route file
const routeClient =require('./routes/index.route.js')
//import  admin route file
const routeAdmin=require('./routes/admin/index.route.js')

var flash = require('express-flash')

var bodyParser = require('body-parser')


//import system.js
const systemConfig = require("./config/system");


var cookieParser = require('cookie-parser')
var session = require('express-session')
const express= require('express');
var methodOverride = require('method-override')
const app=express();

app.use(methodOverride('_method'))


//flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());



require('dotenv').config();
//USING EVN
const port=process.env.PORT;

//move into config file
// const mongoose=require('mongoose');
// mongoose.connect(process.env.URL)


// import database
const database=require('./config/database.js');
database.connect();

//creat model
// const product=mongoose.model('model',{
//     title:String,
//     price:Number,
//     image:String
// });
//move model into MODEL (product.model.js)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app local variable using for .pug only
app.locals.prefixAdmin = systemConfig.prefixAdmin

// import views engine and pug
app.set('views','./views');
app.set('view engine','pug');

//import static file
app.use(express.static('public'));

// move into views file first render.....

// app.get('/',(rep,res)=>{
//     res.render('client/pages/home/index')
// })

// app.get('/products',(req,res)=>{
//     res.render('client/pages/product/index')
// })

// (move into route file index.route.js)


routeClient.index(app);
// import router client


routeAdmin.index(app);

// import admin client
// router+controller
// controller =module + views



app.listen(port,()=>{
    console.log("running")
})



// api== route