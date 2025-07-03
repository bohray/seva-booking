const Seva = require("../models/Seva");

exports.getAllSevas = async (req, res) => {
  try {
    const sevas = await Seva.find();
    res.json(sevas);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Sevas" });
  }
};

exports.getSevaByCode = async (req, res) => {
  try {
    const seva = await Seva.findOne({ code: req.params.code });
    if (!seva) return res.status(404).json({ error: "Seva not found" });
    res.json(seva);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seva" });
  }
};
