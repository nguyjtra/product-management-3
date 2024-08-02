const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userInfo:{
    fullName: String,
    phone: String,
    address: String,
  },
  products:[
    {
        productID:String,
        price: Number,
        discount: Number,
        quantity: Number,
    }
  ]
}, {
  timestamps: true
});

const Account = mongoose.model("order", accountSchema, "orders");

module.exports = Account;