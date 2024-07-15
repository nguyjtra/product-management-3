
let accout=require('../../model/account.model')
var md5 = require('md5');
module.exports.login=(req,res)=>{
    res.render('admin/pages/auth/index')
}

module.exports.loginPost=async(req,res)=>{
    const {email,password}=req.body
    
    const account=await accout.findOne({email:email , deleted:false })
    
    if(!account){
        req.flash('error','error')
        res.redirect("back");
        return ;
    }
    if(account.password!=md5(password)){
        req.flash('error','incorect password')
        res.redirect("back");
        return ;
    }

    if(account.status!='active'){
        req.flash('error','your account have been lock')
        res.redirect("back");
        return;
    }

    res.cookie("token", account.token);

    res.redirect('/admin/account')
}