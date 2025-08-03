const express = require("express");
const router = express.Router();
const { createToken } = require("../hedera/createtoken");
const { transferToken } = require("../hedera/transfertoken");


router.post("/deploy", async (req, res) => {
  try {
    const { name, symbol, supply, decimals, creatorAccountId, bondingCurveContractAddress } = req.body;

    // 1. Create the token
    const tokenId = await createToken(name, symbol, supply, decimals, creatorAccountId);

    // 2. Calculate 80% and 20%
    const eightyPercent = Math.floor((supply * 80) / 100);
    const twentyPercent = supply - eightyPercent;

    // 3. Transfer 80% to the bonding curve smart contract address
    await transferToken(tokenId, creatorAccountId, bondingCurveContractAddress, eightyPercent);

    // 4. (Optional) Return contract address and token ID
    res.json({
      success: true,
      tokenId,
      creatorShare: twentyPercent,
      bondingCurveShare: eightyPercent,
      bondingCurveContractAddress
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
module.exports = router;
