const mongoose=require('mongoose');
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
Schema = mongoose.Schema;
// const product=mongoose.model('product',{
//     title: String,
//     description: String,
//     price: Number,
//     discountPercentage: Number,
//     stock: Number,
//     thumbnail: String,
//     status: String,
//     position: Number,
//     deleted:{
//         type: Boolean,
//         default:false
//     },
// },'products');



let productSchema= new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted:{
        type: Boolean,
        default:false
    },
    slug: { type: String,
            slug: "title" ,
            unique: true
    }

    // createdAt:true,
    // updatedAt:true
},{
    timestamps:true // auto add calss createdAt and updateaAt
}
)


const product=mongoose.model('product',productSchema,'products');

module.exports=product;