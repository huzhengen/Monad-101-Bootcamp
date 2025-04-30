### 一、安装hardhat，并启动hardhat项目

1. npm init -y
2. npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts
3. npx hardhat

---

### 二、编写合约继承ERC721，然后配置hardhat.config.js用于网络链接部署用

1. 编写MyNFT.sol
2. 然后hardhat.config.js里填写rpc地址和account账号私钥，也可以先本地ganache测试一波

---

### 三、编译合约

1. npx hardhat compile

---

### 四、编写部署脚本，并且部署到网络上

1. npx hardhat run scripts/deploy.js --network monadTest

---

### 五、根据部署地址，编写交易脚本，进行交易

1. npx hardhat run scripts/mint.js --network monadTest