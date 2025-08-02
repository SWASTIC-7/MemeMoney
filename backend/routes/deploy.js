const express = require("express");
const router = express.Router();
const { createToken } = require("../hedera/createtoken");

router.post("/deploy", async (req, res) => {
  try {
    const { name, symbol, supply, decimals } = req.body;
    const tokenId = await createToken(name, symbol, supply, decimals);
    res.json({ success: true, tokenId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
