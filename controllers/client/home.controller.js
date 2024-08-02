let product=require('../../model/product.model')

module.exports.index=async (rep,res)=>{
    let newProduct= await product
    .find({featured:'1', deleted:false, status:'active'})
    .select('-description')
    .sort({position:'desc'})
    .limit(6)

    let newProduct2= await product
    .find({ deleted:false, status:'active'})
    .select('-description')
    .sort({position:'desc'})
    .limit(6)
    res.render('client/pages/home/index',{
        pageTitle : 'main page',
        productsFeatured:newProduct,
        productsNew:newProduct2

    })
     
}