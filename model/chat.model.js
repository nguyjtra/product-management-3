const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    
    userId:String,
    content:String,
    img:Array

}, {
  timestamps: true
});

const cart = mongoose.model("chat", accountSchema, "chats");

module.exports = cart;