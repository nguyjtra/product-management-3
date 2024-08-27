const Account = require("../../model/user.model")

module.exports.info=async(req,res,next)=>{
    let Client=await Account.findOne({token:req.cookies.tokenUser})
if(req.cookies.tokenUser && Client){    

    res.locals.Client=Client
    
}
next();
}

module.exports.requireAuth=async(req,res,next)=>{
    if(req.cookies.tokenUser){
        const user=await Account.findOne({token:req.cookies.tokenUser, deleted:false})

        if(!user){
            res.redirect('/user/login')
            return 
        }
    }
    else{
        res.redirect('/user/login')
        return
    }

    next();
}