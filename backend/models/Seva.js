const mongoose = require("mongoose");

const sevaSchema = new mongoose.Schema({
  code: String,
  title: String,
  tags: [String],
  description: String,
  marketPrice: Number,
  discountPrice: Number,
  start: String,
  end: String,
  amountRaised: Number,
  targetAmount: Number,
  media: String,
});

module.exports = mongoose.model("Seva", sevaSchema);
