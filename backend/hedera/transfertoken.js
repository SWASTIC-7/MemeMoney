const {
  TokenTransferTransaction,
  AccountId,
  Client,
  PrivateKey,
  TransferTransaction,
} = require("@hashgraph/sdk");

async function transferToken(tokenId, fromId, toId, amount) {
  const client = getClientForNetwork(); // your client setup here

  const transaction = await new TransferTransaction()
    .addTokenTransfer(tokenId, fromId, -amount)
    .addTokenTransfer(tokenId, toId, amount)
    .freezeWith(client);

  const signTx = await transaction.sign(PrivateKey.fromStringECDSA(process.env.CREATOR_PRIVATE_KEY));
  const txResponse = await signTx.execute(client);
  const receipt = await txResponse.getReceipt(client);

  console.log("Transfer status:", receipt.status.toString());
  return receipt;
}

module.exports = { transferToken };