const mongoose=require('mongoose');
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
Schema = mongoose.Schema;

const productCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
      type: String,
      default: ""
    },
    description: String,
    thumbnail: String,
    status: {
      type: String,
      default: "active"
    },
    CategoryPosition: Number,
    deleted: {
      type: Boolean,
      default: false
    },
    slug: {
      type: String,
      slug: "title",
      unique: true
    }
  }, {
    timestamps: true 
  });
  
  const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");
  
  module.exports = ProductCategory;