const mongoose=require('mongoose');

Schema = mongoose.Schema;

const productCategorySchema = new mongoose.Schema({
    title: String,
    description: String,
    permission:{
        type:Array,
        default:[]
    },
    deleted: {
      type: Boolean,
      default: false
    },
  }, {
    timestamps: true 
  });
  
  const Role = mongoose.model("role", productCategorySchema, "roles");
  
  module.exports = Role;