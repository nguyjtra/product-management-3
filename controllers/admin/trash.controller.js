const product = require("../../model/product.model")

module.exports.index=async(req,res)=>{
    const find={
        deleted:true,
    }
    const pagination={
        currentPage:1,
        limitItems:4
    }

    if(req.query.page){
        pagination.currentPage=parseInt(req.query.page)
    }

    pagination.skip=(pagination.currentPage-1)* pagination.limitItems;

    const countProduct=await product.countDocuments(find);

    pagination.totalPage =Math.ceil(countProduct/pagination.limitItems);



    const products=await product.find(find).limit(pagination.limitItems).skip(pagination.skip);
    res.render('admin/pages/deleted/index',{
        product:products,
        pagination:pagination
    })
}
module.exports.reverse=async(req,res)=>{
    await product.updateOne({
        _id: req.params.id
    },{
        deleted:false
    })

    req.flash('status', 'success');

    res.json({
        code:200
     });
}

module.exports.reverseMany=async(req,res)=>{
    console.log(req.body);
    await product.updateMany({
        _id:req.body.a
    },{
        deleted:false
    })

    req.flash('status', 'success');

    res.json({
        code:200
     });
}

module.exports.delete=async(req,res)=>{
    await product.deleteOne({
        _id: req.params.id
    })

    req.flash('status', 'success');

    res.json({
        code:200
     });
}