const {
  Client,
  TokenCreateTransaction,
  PrivateKey,
  AccountId,
} = require("@hashgraph/sdk");
require("dotenv").config();

async function createToken(name, symbol, supply, decimals) {
  const client = Client.forTestnet()
    .setOperator(process.env.OPERATOR_ID, process.env.OPERATOR_KEY);

  const treasuryId = AccountId.fromString(process.env.TREASURY_ID);
  const treasuryKey = PrivateKey.fromStringECDSA(process.env.TREASURY_KEY);
  const adminKey = PrivateKey.fromStringECDSA(process.env.ADMIN_KEY);

  const transaction = await new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setTreasuryAccountId(treasuryId)
    .setInitialSupply(supply)
    .setDecimals(decimals)
    .setAdminKey(adminKey.publicKey)
    .freezeWith(client);

  const signedTx = await (await transaction.sign(adminKey)).sign(treasuryKey);
  const txResponse = await signedTx.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const tokenId = receipt.tokenId.toString();

  console.log(`Token Created: ${tokenId}`);
  return tokenId;
}

module.exports = { createToken };
