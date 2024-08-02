
let account=require('../../model/user.model')
var md5 = require('md5');
let token=require('../../helpers/generate');
let forgotPass=require('../../model/forgot-password.model')
let email=require('../../helpers/sendMail')

module.exports.register=async(req,res)=>{
    res.render('client/pages/user/index',{
        pageTitle:'Creat Account'
    })
}



module.exports.creatAccount=async(req,res)=>{
    let check = await account.findOne({email:req.body.email,  deleted:false})

    if(check){
        req.flash('error','exit email')
        res.redirect('back')
        return;
    }
    const user={
        fullName:req.body.fullName,
        email:req.body.email,
        password:md5(req.body.password),
        token:token.generateRandomString(30)
    }

    let k= new account(user)
    await k.save();
    res.cookie('tokenUser',user.token)
    res.redirect('/')

}

module.exports.login=async(req,res)=>{
    res.render('client/pages/user/login/index')
}


module.exports.Login=async(req,res)=>{
    let check=await account.findOne({email:req.body.email , deleted:false})
    let  check1=md5(req.body.password)
    if(check && check1==check.password){
        res.cookie('tokenUser',check.token)
        res.redirect('/')
    }
    else{
        req.flash('error','incorect password/email')
        res.redirect('back')
        return
    }
}

module.exports.logout=async(req,res)=>{
    res.clearCookie('tokenUser')
    res.redirect('/user/login')
}

module.exports.forgot=async(req,res)=>{
    res.render('client/pages/user/forgot/index')
}

module.exports.Forgot=async(req,res)=>{
    const check=await account.findOne({email:req.body.email , deleted:false})
    if(!check){
        req.flash('error','Your Email does not exit')
        res.redirect('back')
        return
    }
    const otp=token.generateRandomNumber(6)
    const a={
        email:req.body.email,
        otp:otp,
        expireAt: Date.now()+5*60*1000
    }
    let exportt= new forgotPass(a);

    await exportt.save();
    

    email(req.body.email,"reset password",`Code is <b style="color: green;">${otp}</b>`)


    res.redirect(`/user/password/otp?email=${req.body.email}`);

}

module.exports.otp=async(req,res)=>{
    let email=req.query.email
    res.render('client/pages/user/otp/index',{
        email:email
    })

}

module.exports.Otp=async(req,res)=>{
    let email=req.body.email;
    let p=req.body.otp;


    const check=await forgotPass.findOne({
        email:email,
        otp:p
    })

    if(!check){
        req.flash('error',"incorrect Otp")
        res.redirect('back')
        return
    }

    let user=await account.findOne({email:email})

    res.cookie('tokenUser',user.token)

    res.redirect("/user/password/reset");
}


module.exports.reset=async(req,res)=>{
    res.render('client/pages/user/reset/index')
}


module.exports.resetP=async(req,res)=>{
    const pass=req.body.password;

    await account.updateOne({
        token:req.cookies.tokenUser,
        deleted:false
    },{
        password:md5(pass)
    })

    req.flash('status','success')

    res.redirect('/')
}

module.exports.profile=(req,res)=>{
    res.render('client/pages/user/profile/index')
}