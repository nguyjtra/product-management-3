
const productCategory=require('../../model/category.model')
const tree=require('../../helpers/display_tree')

module.exports=async(req,res,next)=>{
    const categoryProduct=await productCategory.find({
        deleted:false,
        status:'active'
    })

    res.locals.layoutCategoryProducts=tree(categoryProduct)

    next();
}