// routes/wallet.js
const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");

// Temporary session store
const verifiedWallets = {};

router.post("/verify-wallet", async (req, res) => {
  const { address, signature, message } = req.body;

  try {
    const recovered = ethers.utils.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ success: false, error: "Signature mismatch" });
    }

    // Store session or associate with Hedera Account ID
    verifiedWallets[address] = true;
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
