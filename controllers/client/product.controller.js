const product = require("../../model/product.model");

//import model (product.model.js) database

module.exports.index=async(req,res)=>{

    const products=await product
    .find({
        status:"active",
        deleted:false
    })
    .sort({position:"desc"})
    for(const item of products){
        item.priceNew=parseInt(item.price*(1-item.discountPercentage/100));
        
    }

    console.log(products);

    res.render('client/pages/product/index',{
        pageTitle : 'product list',
        product:products
    });
        

}

module.exports.detail = async(req,res)=>{
    let slug=req.params.slug;

    let products= await product.findOne({
        slug:slug
    })
    res.render('client/pages/detail/index',{
        product:products
    });

}