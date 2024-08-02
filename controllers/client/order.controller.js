
let cart=require('../../model/cart.model')
const Product = require('../../model/product.model')
let Order=require('../../model/order.model')

module.exports.index=async(req,res)=>{
  let id=req.cookies.cartID
  console.log(id)
 const Cart=await cart.findOne({_id:id});


  Cart.totalPrice=0;
 if(Cart.products.length>0){
  for(let item of Cart.products){
      const productInfo=await Product.findOne({
          _id: item.productid
      }).select('title thumbnail slug price discountPercentage ')
      productInfo.priceNew = (1 - productInfo.discountPercentage/100) * productInfo.price;

      productInfo.totalPrice= productInfo.priceNew * item.quantity

      item.productInfo=productInfo
      Cart.totalPrice+= productInfo.totalPrice

  }
 }
  res.render('client/pages/order/index',{
    cartDetail:Cart
  })
}



module.exports.order=async(req,res)=>{
  let id=req.cookies.cartID
  let user=req.body;

  const Cart=await cart.findOne({_id:id})

  const orderData={
    userInfo:user,
    products:[]
  }

  for(const item of Cart.products){
    let product=await Product.findOne({_id:item.productid})
    orderData.products.push({
      productID:item.productid,
      price:product.price,
      discount:product.discountPercentage,
      quantity:item.quantity
    })
  }

  let newOrder= await new Order(orderData)

  newOrder.save()

  await cart.updateOne({
    _id:id
  },{
      products:[],
  })


  res.redirect(`/checkout/success/${newOrder.id}`)

}


let total=0;
module.exports.success=async(req,res)=>{
  let id=req.params.id;
  let order=await Order.findOne({_id:id})
  for(const item of order.products){
    let product=await Product.findOne({_id:item.productID})

    item.thumbnail=product.thumbnail
    item.title=product.title
    item.priceNew=(1 - item.discount/100) * item.price;
    item.totalPrice=item.priceNew*item.quantity
    total+= item.totalPrice
  }

  res.render('client/pages/success/index',{
    totalPrice:total,
    order:order
  })
}