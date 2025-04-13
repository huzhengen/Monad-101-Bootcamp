## 第一章：走进 Web3 世界

1. 简单描述一下本地开发、部署合约的流程  
答：本地使用Solidity 开发合约，然后可以借助 hardhat 或者 foundry 这两个工具进行测试和部署，使用 hardhat 时
编写 nodejs 脚本将 Solidity 编译为字节码，然后通过 deploy 指令部署到线上，同样地 foundry 也有一样的部署指令

2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程     
链接钱包---用户与 DApp 交互---请求钱包进行授权---交互成功
 
3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧
零信任。简单来说就是保持怀疑，而且是始终保持怀疑。 
持续验证。你要相信，你就必须有能力去验证你怀疑的点，并把这种能力养成习惯。
做好隔离，也就是鸡蛋不要放在一个篮子里。
