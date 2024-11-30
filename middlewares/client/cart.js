
const cart = require('../../model/cart.model');

module.exports=async(req,res,next)=>{
    // recive cookie from FE
    if(!req.cookies.cartID){
        let Cart=new cart();
       await Cart.save();
       // auto creat cart product
       const expires=365*24*60*60*1000
       res.cookie(
        'cartID',
        Cart.id,
        {
        expires: new Date(Date.now()+expires)
       }
    )
       // transfer cartID cookies to FE 
    }else{
        const CCart=await cart.findOne({
            _id:req.cookies.cartID
        });
       
        res.locals.cartTotal=CCart.products.length || 0;
    }

    next();
}