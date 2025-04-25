// scripts/mint.js
const hre = require("hardhat");

async function main() {
  // 获取合约实例
  const myNFT = await hre.ethers.getContractAt(
    "MyNFT",
    "0x3A2B458E7D4F1F816CFc309bAd9C885f6cD5ABF5"
  );

  // 获取部署者账户
  const [deployer] = await hre.ethers.getSigners();
  console.log("Minting NFT with account:", deployer.address);

  // 调用 mintNFT 函数
  const tx = await myNFT.mintNFT(deployer.address);
  await tx.wait();

  console.log("NFT minted successfully!");
  console.log("Transaction hash:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});