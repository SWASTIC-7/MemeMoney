import express from 'express';
import { ethers } from 'ethers';
import MemeTokenFactoryABI from '../abi/memetokenfactory.json';
require("dotenv").config();

const router = express.Router();

const FACTORY_ADDRESS = '0x7EaD952369998fDccf3409e93c8BFD0676a92024';
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Backend wallet private key (not user key)
const PROVIDER_URL = process.env.RPC_URL; // Infura or Hedera RPC

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const factory = new ethers.Contract(FACTORY_ADDRESS, MemeTokenFactoryABI.output.abi, wallet);

router.post('/create-token', async (req, res) => {
  const { name, symbol, supply, userAddress } = req.body;

  if (!name || !symbol || !supply || !userAddress) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const supplyInWei = ethers.parseUnits(supply.toString(), 18);
    const tx = await factory.createToken(name, symbol, supplyInWei, userAddress);
    await tx.wait();

    res.status(200).json({ message: 'Token created', txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Token creation failed' });
  }
});

export default router;
