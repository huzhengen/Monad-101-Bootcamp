## 第一章：走进 Web3 世界

1. 简单描述一下本地开发、部署合约的流程                                                              

1、安装开发工具：如Node.js、Hardhat、Ganache
2、使用hardhat init 构建项目框架
3、连接Ganache本地环境，在script文件下写deploy部署脚本
4、使用npx hardhat complie 然后再执行npx hardhat script/deploy.js --network进行部署


2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程                                                
 1、连接钱包：
   通过DApp前端连接加密钱包（如MetaMask）。
   钱包授权DApp访问用户账户地址。

2、发起交互：
    在DApp界面执行转账或购买NFT。

3、签名交易：
   钱包提示用户确认交易详情（包括Gas费用和合约地址）。

4、发送交易：
   签名后的交易通过DApp发送到区块链网络。

5、反馈结果：
    可以再区块链浏览器或者metamask上看到执行结果是否成功


3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧 
1、凡事多留个心眼，反复查清楚

2、助记词藏好

3、大钱小钱分开管，授权别乱给


