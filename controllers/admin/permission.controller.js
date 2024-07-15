
let product=require('../../model/role.model')

module.exports.index=async(req,res)=>{

    let products= await product.find({deleted:false})
    res.render('admin/pages/permission/index',{
    records:products
}
    )
}


module.exports.Update=async(req,res)=>{
   req.body.forEach(async(item)=> {
        await product.updateOne({
            _id:item.id
        },{
            permission:item.permissions
        })
   });
    res.json({
        code:200
     });
}