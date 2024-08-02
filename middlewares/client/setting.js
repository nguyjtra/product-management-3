
let setting=require('../../model/setting.model')

module.exports=async(req,res,next)=>{

    let a=await setting.findOne({});

    res.locals.setting=a;
    
    next();
}