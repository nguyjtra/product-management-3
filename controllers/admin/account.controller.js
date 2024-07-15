
let roles=require('../../model/role.model')
let account=require('../../model/account.model')
var md5 = require('md5');
let generate=require('../../helpers/generate')


module.exports.index=async(req,res)=>{
    let record=await account.find({deleted:false}) 
    

    for(const item of record){

    let role=await roles.findOne({_id:item.role_id})

    item.roleTitle=role.title
   }

    res.render('admin/pages/account/index',{
        records:record
    })
}

module.exports.creat=async(req,res)=>{
    let role=await roles.find({deleted:false})
    res.render('admin/pages/account/creat/index',
        {
            roles:role
        }
    )
}

module.exports.creatAccount=async(req,res)=>{


    req.body.password= md5(req.body.password)
    req.body.token=generate.generateRandomString(30)
    console.log(req.body)
    let Account= new account(req.body)
    await Account.save();
    req.flash('status','success')
    res.redirect('/admin/account')
    
}


module.exports.edit=async(req,res)=>{

    let id=req.params.id

    let role=await roles.find({deleted:false})

    let product=await account.findOne({_id:id})

    res.render('admin/pages/account/edit/index',{
        account:product,
        roles:role
    })
}

module.exports.editt=async(req,res)=>{

    let id=req.params.id

    console.log(req.body)

    if(req.body.password){

    req.body.password=md5(req.body.password)}


    await account.updateOne({_id:id},req.body)

    req.flash('success','success')

    res.redirect('/admin/account')
    
}


module.exports.delete=async(req,res)=>{
    await account.deleteOne({_id:req.params.id})
    req.flash('success','success')
    res.redirect('/admin/account')
}   