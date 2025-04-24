## 第一章：走进 Web3 世界

1. 简单描述一下本地开发、部署合约的流程

   以 Hardhat 框架为例，本地部署流程如下：

   - `npm install --save-dev hardhat` 安装 Hardhat 开发框架
   - 初始化： `npx hardhat init` 创建新项目
   - 合约开发：在 `contracts` 目录下编写智能合约代码
   - 部署准备：
     - 在 `scripts` 目录下编写部署脚本
     - 在 `hardhat.config.js` 中配置网络和账户信息
   - 合约部署：
     - 本地测试：使用 `npx hardhat node` 启动本地测试链
     - 正式部署：使用 `npx hardhat run scripts/deploy.ts --network testMonad` 部署到目标网络
     - 验证合约：使用 `npx hardhat run scripts/verify.ts --network testMonad` 合约开源

2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程

   用户与 DApp 交互的主要流程包括以下几个步骤：

   - 连接钱包
     - 用户首先需要通过 MetaMask 等 Web3 钱包连接到 DApp
     - 这一步会建立 DApp 与用户钱包之间的连接，使 DApp 能够访问用户的账户信息
   - 前端交互
     - 用户通过 DApp 的用户界面进行操作（如点击按钮、填写表单等）
     - DApp 前端会调用智能合约的 ABI（应用程序二进制接口）
     - ABI 定义了如何与智能合约进行交互的标准方式
   - 钱包签名与广播
     - 当用户确认操作后，钱包会弹出签名请求
     - 用户需要在钱包中确认交易，并支付相应的 gas 费用
     - 签名后的交易会被广播到区块链网络
   - 状态更新
     - 交易被确认后，DApp 会读取最新的链上数据
     - 前端界面会根据链上的新状态进行更新
     - 用户可以看到操作后的结果反馈

3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧
   - 使用多签，尽量降低风险
   - 用硬件钱包，私钥和助记词不要泄露给任何人
   - 仔细验证网站和合约地址，警惕钓鱼网站
