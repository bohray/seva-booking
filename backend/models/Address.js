const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  addrLine1: String,
  addrLine2: String,
  city: String,
  state: String,
  pincode: Number,
  type: Number,
  verified: Boolean,
});

module.exports = mongoose.model("Address", addressSchema);
