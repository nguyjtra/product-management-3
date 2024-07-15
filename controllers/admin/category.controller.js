
const product = require("../../model/category.model") 
const display_tree= require('../../helpers/display_tree')
module.exports.index=async(req,res)=>{

    const products=await product.find({deleted:false})

    res.render('admin/pages/category/index',{
        pageTitle:'Category page',
        product: products
    })
    
}


module.exports.displayAddnew=async (req,res)=>{

    let categories=await product.find({deleted:false})


    // const createTree=(array,parentID="")=>{

    //     const tree=[];

    //     for(const item of array){

    //         if(item.parent_id==parentID){

    //             children=createTree(array,item.id)

    //             if(children.length>0){

    //                 item.children=children
    //             }
    //             tree.push(item)
    //         }
                
    //     }
        
    //     return tree;
    // }

    let newCategory= display_tree(categories)
    console.log(newCategory)
    res.render('admin/pages/category/addNew/index.pug',{
        pageTitle:'add new',
        categories:newCategory

    })
}

module.exports.creat=async(req,res)=>{
    console.log(req.body.CategoryPosition)
    
    if(!req.body.CategoryPosition){
        req.body.CategoryPosition=parseInt(await product.countDocuments({})+1)
    }
    else{
    req.body.CategoryPosition=parseInt(req.body.CategoryPosition);}


    let newProduct= new product(req.body);
    console.log(newProduct)
    await newProduct.save();

    res.redirect('/admin/products-category/')

}


module.exports.edit_display=async(req,res)=>{
    try{
    let id=req.params.id;
    
    let products=await product.findOne({_id:id,deleted:false})
    
    let productALL=await product.find({deleted:false})
    let categories=display_tree(productALL)
    res.render('admin/pages/category/edit/index',{
        product:products,
        category:categories
    })}
    catch(error){
       req.redirect('/admin/products-category') 
    }
}

module.exports.edit=async(req,res)=>{
    console.log(req.body)
    if(req.body.CategoryPosition){
        req.body.CategoryPosition=parseInt(req.body.CategoryPosition);
    }
    else  {req.body.CategoryPosition=  (await product.countDocuments({}))+1;}

    await product.updateOne({
        _id:req.params.id
    },req.body
    )
    
    res.redirect('/admin/products-category/')
}

module.exports.delete=async(req,res)=>{
    try{
    let id=req.params.id;
    console.log(id)
    await product.deleteOne(
       {
         _id: req.params.id

       }
    )
    req.flash('status','success')
    res.json({
        code:200
     });}
     catch(error){
        
        req.flash('error','Try again')

        res.redirect('/admin/products-category/')
     }

}