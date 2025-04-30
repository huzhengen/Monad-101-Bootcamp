## 第一章：走进 Web3 世界

### 1. 简单描述一下本地开发、部署合约的流程

> Solidity

`.sol`文件，语法类似js，开发智能合约，在EVM中运行。

1. 合约开发
1. 本地调试
    1. 配置本地链开发环境，`hardhat`本地以太坊网络
    1. 配置本地连接线上链RPC，查看线上log
1. 部署


### 2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程
1. 浏览器插件(Metamask or ...)
1. Dapp连接钱包(去中心化的登陆这么说会被打吗)
1. Dapp交互，与钱包通信
1. 钱包提示确认Transaction request，发起与合约交互
1. 广播交易，链上更新

 
### 3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧
1. 钱包管理，冷热分离，私人/开发分离
1. 加密，冷备份混合在线备份
1. 运行环境安全(官方渠道安装插件及浏览器，系统及时更新)