const {
  ContractCreateFlow,
  FileCreateTransaction,
  ContractFunctionParameters,
} = require("@hashgraph/sdk");

// contractBytecode = compiled bytecode of BondingCurveHTS
async function deployBondingCurve(tokenAddress, treasuryAddress) {
  const client = getClient();

  // Upload bytecode to Hedera file storage
  const fileTx = new FileCreateTransaction()
    .setContents(contractBytecode)
    .freezeWith(client);
  const signedFile = await fileTx.sign(adminKey);
  const fileResponse = await signedFile.execute(client);
  const bytecodeFileId = (await fileResponse.getReceipt(client)).fileId;

  // Deploy the contract
  const contractTx = new ContractCreateFlow()
    .setGas(1000000)
    .setBytecodeFileId(bytecodeFileId)
    .setConstructorParameters(
      new ContractFunctionParameters()
        .addAddress(tokenAddress) // HTS token address
        .addAddress(treasuryAddress) // creator address or SourceSwap
    );

  const contractResponse = await contractTx.execute(client);
  const receipt = await contractResponse.getReceipt(client);
  return receipt.contractId.toSolidityAddress();
}
module.exports = { deployBondingCurve };