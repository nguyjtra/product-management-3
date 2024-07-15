
let model=require('../../model/role.model')

module.exports.index=async(req,res)=>{
    let product= await model.find({deleted:false})
    res.render('admin/pages/role/index',{
        records:product
    })
}

module.exports.DisplayAdd=(req,res)=>{
    res.render('admin/pages/role/creat/index')
}

module.exports.creat=async(req,res)=>{
    let newProduct= new model(req.body)
    newProduct.save();
    req.flash("status","success")
    res.redirect('/admin/role')
}

module.exports.DisplayEdit=async(req,res)=>{
    let products= await model.findOne({_id:req.params.id})
    res.render('admin/pages/role/edit/index',{
        product:products
    })
   
}

module.exports.edit=async(req,res)=>{

    await model.updateOne({
        _id:req.params.id
    },
       req.body 
    )
    res.redirect('/admin/role/')
}

module.exports.delete=async(req,res)=>{

    await model.deleteOne({_id:req.params.id});
    req.flash('success','success')
    res.redirect('/admin/role/')
}