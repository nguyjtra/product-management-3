const Account = require("../../model/user.model")

module.exports.info=async(req,res,next)=>{
    let Client=await Account.findOne({token:req.cookies.tokenUser})
if(req.cookies.tokenUser && Client){    

    res.locals.Client=Client
    
}
next();
}