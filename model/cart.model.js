const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    products:[
        {
            productid: String,
            quantity: Number

        }
    ]
}, {
  timestamps: true
});

const cart = mongoose.model("cart", accountSchema, "carts");

module.exports = cart;