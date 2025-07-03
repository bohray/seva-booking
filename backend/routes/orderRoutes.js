const express = require("express");
const router = express.Router(); // fix was needed here
const Order = require("../models/Order");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { user, address, items, paymentId, orderId, amountToPay } = req.body;

    if (!user || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    
    let existingUser = await User.findOne({ contact: user.contact });
    if (!existingUser) {
      existingUser = await User.create(user);
    }

    
    const newOrder = await Order.create({
      userId: existingUser._id,
      address,
      items,
      paymentId: paymentId || "", 
      orderId: orderId || "", 
      amountToPay: amountToPay || 0,
      createdAt: Date.now(),
    });

    res.status(201).json({
      message: "Order placed",
      orderId: newOrder._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders || { message: "No orders placed" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user orders", error: err.message });
  }
});

module.exports = router;
