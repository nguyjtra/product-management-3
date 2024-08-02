let cart=require('../../model/cart.model')
let product=require('../../model/product.model')
module.exports.index=async(req,res)=>{

   let id=req.cookies.cartID
    console.log(id)
   const Cart=await cart.findOne({_id:id});

  
    Cart.totalPrice=0;
   if(Cart.products.length>0){
    for(let item of Cart.products){
        const productInfo=await product.findOne({
            _id: item.productid
        }).select('title thumbnail slug price discountPercentage ')
        productInfo.priceNew = (1 - productInfo.discountPercentage/100) * productInfo.price;

        productInfo.totalPrice= productInfo.priceNew * item.quantity

        item.productInfo=productInfo
        Cart.totalPrice+= productInfo.totalPrice

    }
   }
res.render('client/pages/cart/index',{
    pageTitle:'Cart',
    cartDetail:Cart
})

}




module.exports.add=async(req,res)=>{
    let cartID=req.cookies.cartID
    let id=req.params.id
    let quantity=parseInt(req.body.quantity);


    const Cart= await cart.findOne({
        _id:cartID
    });
    const exitProductInCart= Cart.products.find(item=> item.productid==id)

    console.log(exitProductInCart);
    if(exitProductInCart)
        {
            await cart.updateOne({
                _id:cartID,
                'products.productid' :id

            },{
                $set:{
                    'products.$.quantity':quantity+exitProductInCart.quantity
                }
            })
        }
    else {
    await cart.updateOne({
        _id:cartID
    },{ 
      $push:{  products:[        
    {
        productid : id,
        quantity : quantity
    }
        ]
    }
}
)
    }
    
    req.flash('status', 'success');
    
    res.redirect('back');

}


module.exports.delete=async(req,res)=>{
    const id=req.cookies.cartID
    const IDproduct=req.params.id;
    const Cart=await cart.updateOne({_id:id},{
        $pull:{
            products: {
               productid: IDproduct   
        }
        }
    })
    res.redirect('back')
    

}

module.exports.update=async(req,res)=>{
    const id=req.cookies.cartID
    const IDproduct=req.params.id;
    const quantity=parseInt(req.params.quantity)
    
    await cart.updateOne({_id:id, 'products.productid':IDproduct},{

        $set:{
            'products.$.quantity':quantity
        }

    })
    
    res.redirect('back')
}