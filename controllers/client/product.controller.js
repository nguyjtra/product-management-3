const product = require("../../model/product.model");
const category=require('../../model/category.model');
const ProductCategory = require("../../model/category.model");
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
    products.priceNew = ((1 - products.discountPercentage/100) * products.price).toFixed(0);
    res.render('client/pages/detail/index',{
        product:products
    });


}

module.exports.menu=async(req,res)=>{
    let slug=req.params.slug;
    let menu=await category.findOne({slug:slug, status:'active', deleted:false})
    const subMenu=[];

    const getSub=async(id)=>{

        const sub=await ProductCategory.find({
            parent_id:id,
        })
        for(const a of sub){
            subMenu.push(a.id)
           await getSub(a.id)
        }

    }

    await getSub(menu.id)
    console.log(subMenu)
    const products= await product.find({
        product_category_id:{
            $in:[
                menu.id,
                ...subMenu
            ]
        },
    })
    res.render('client/pages/product/index',{
        pageTitle:menu.title,
        product:products
    })

}