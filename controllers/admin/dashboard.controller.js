const product = require("../../model/product.model");


module.exports.index=async(req,res)=>{
    const statistic = {
        categoryProduct: {
          total: 0,
          active: 0,
          inactive: 0,
        },
        product: {
          total: 0,
          active: 0,
          inactive: 0,
        },
        account: {
          total: 0,
          active: 0,
          inactive: 0,
        },
        user: {
          total: 0,
          active: 0,
          inactive: 0,
        },
      };

statistic.product.total= await product.countDocuments({deleted:false})
statistic.product.active=await product.countDocuments({deleted:false, status:'active'})
statistic.product.inactive=await product.countDocuments({deleted:false, status:'inactive'})

    res.render('admin/pages/dashboard/index',{
        pageTitle:'ADMIN page',
        statistic:statistic
    })
    
}