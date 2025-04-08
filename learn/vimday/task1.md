## 第一章：走进 Web3 世界

### 1. 简单描述一下本地开发、部署合约的流程

#### 开发环境设置
- **使用 Remix IDE**：  
  这是一个浏览器工具，适合初学者，无需本地安装。  
  1. 打开 Remix IDE，编写合约。  
  2. 选择最新 Solidity 版本（目前为 0.8.x）。  
  3. 编译后可直接部署到测试网。

- **使用 Hardhat**：  
  适合复杂项目，需要安装 Node.js 和 npm。  
  1. 初始化项目后安装 Hardhat 和 Ethers.js。  
  2. 编写合约并用 `npx hardhat compile` 编译。

#### 部署流程
- **在 Remix 中**：  
  部署到 Goerli 或 Sepolia 测试网，通过“部署和运行交易”选项完成。

- **在 Hardhat 中**：  
  1. 获取 Alchemy API 密钥，设置环境变量（如 `.env` 文件）。  
  2. 用 `npx hardhat run scripts/deploy.js --network goerli` 部署。  
  3. 通过 Goerli Etherscan 验证。

#### 注意事项
- 始终使用最新 Solidity 版本（0.8.x）以获取安全修复。  
- 遵循安全最佳实践，如代码审查和测试，避免主网部署风险。

---

### 2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程

#### 用户交互
用户通过 DApp 前端界面与智能合约交互，通常使用 MetaMask、Rabby 或 OKX 等钱包。  
1. 用户在 DApp 上选择操作（如转账、投票等）。  
2. DApp 调用智能合约的函数，并生成交易。  
3. 用户确认交易，MetaMask 提供签名。

---

### 3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧

#### 安全技巧
1. **私钥安全**：  
   永远不要将私钥或助记词存储在不安全的地方，如云端或本地文本文件。  
   使用硬件钱包或安全的密码管理器来存储。

2. **合约审计**：  
   在使用任何智能合约前，确保它经过专业的安全审计。  
   不要轻信未经审计的合约，尤其是涉及资金的操作。

3. **交易确认**：  
   在进行任何交易前，仔细检查交易详情，包括接收地址和金额。  
   确保没有恶意软件或钓鱼网站篡改交易信息。