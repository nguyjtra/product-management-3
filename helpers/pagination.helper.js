
const product = require("../model/product.model")

module.exports=async(req,find)=>{
    const pagination={
        currentPage:1,
        limitItems:4
     };
    
        if(req.query.page){
            pagination.currentPage=parseInt(req.query.page)
        }
        pagination.skip=(pagination.currentPage-1)* pagination.limitItems;
    
    
        const countProduct=await product.countDocuments(find);
    
    
        pagination.totalPage =Math.ceil(countProduct/pagination.limitItems);
    

    return pagination
    
}