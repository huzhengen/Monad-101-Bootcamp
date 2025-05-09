## 第一章：走进 Web3 世界

### 1. 简单描述一下本地开发、部署合约的流程 
  1. **初始化项目**  
   `npm init -y` 或 `npx hardhat init` 创建基础项目结构

  2. **安装依赖**  
   `npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox`

  3. **编写合约**  
   在 `contracts/` 目录创建 `.sol` 文件，实现智能合约逻辑

  4. **配置网络**  
   修改 `hardhat.config.js`，设置本地网络或测试网节点信息

  5. **编写部署脚本**  
   在 `scripts/` 目录创建部署脚本，使用 `ethers.deployContract()` 方法

  6. **启动本地节点**  
   `npx hardhat node` 启动本地区块链环境

  7. **编译部署合约**  
   `npx hardhat compile` 编译合约，`npx hardhat run scripts/deploy.js --network localhost` 部署

### 2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程                                                
  1. 访问DApp前端界面
  2. 连接区块链钱包
  3. 触发合约操作
  4. 用户签名交易
  5. 交易广播与上链
  6. 交易结果反馈

### 3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧 
  1. 私钥离线存储：永不泄露助记词/私钥，禁用截屏、网络传输，仅用硬件钱包或物理介质保存。

  2. 警惕钓鱼授权：手动核对DApp链接，定期撤销无用合约权限

  3. 交互前验合约：小额测试确认安全后再大额操作。