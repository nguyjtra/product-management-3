
let product= require('../../model/product.model')

module.exports.index=async(req,res)=>{

const regex=new RegExp(req.query.keyword,'i');

let products=await product.find({
    title:regex,
    status:'active',
    deleted:false
})
res.render('client/pages/product',{
    product:products
})

}