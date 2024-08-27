const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  token: String,
  avatar: String,
  role_id: String,
  acceptFriends: Array,
  requestFriends: Array,
  friendList: Array,
  status: {
    type:String,
    default:'active'
  },
  deleted:{
    type:Boolean,
    default:'false'
  }
}, {
  timestamps: true
});

const Account = mongoose.model("user", accountSchema, "users");

module.exports = Account;