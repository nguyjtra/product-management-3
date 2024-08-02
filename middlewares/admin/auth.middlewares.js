const account=require('../../model/account.model')

const role=require('../../model/role.model')

module.exports=async (req,res,next)=>{

    if(!req.cookies.token){

        res.redirect('/admin/auth/login')

        return;
    }
    let Account=await account.findOne({token:req.cookies.token}).select('fullName email phone avatar role_id status')

    if(!Account){

        res.redirect('/admin/auth/login')
        
        return; 
    }

    res.locals.user=Account

    const Role=await role.findOne({_id:Account.role_id}).select('title permission')

    res.locals.role=Role

    next();

}