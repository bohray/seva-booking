const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  address: Object,
  userId: mongoose.Schema.Types.ObjectId,
  paymentId: String,
  orderId: String,
  amountToPay: Number,
});

module.exports = mongoose.model("Order", orderSchema);
