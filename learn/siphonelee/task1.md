1. 简单描述一下本地开发、部署合约的流程
   这里以foundry为例进行说明：
   1. 安装 Foundry；
   2. forge init xxx 初始化项目，生成的项目结构包含 src/（合约）、test/（测试）、script/（部署脚本）；
   3. 在src文件夹下进行合约编写，script文件夹下进行脚本开发，test 文件夹下进行测试代码编写；
   4. forge build 编译合约，编译结果保存在 out/ 目录；
   5. 使用 forge create 部署合约到测试网，或者可以使用`anvil` 快速起一个本地测试链，将合约部署到本地网；
   6. 使用 cast 发送交易或查询状态，与合约交互。

2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程
   1. 用户通过 MetaMask、WalletConnect 等钱包连接 DApp 前端页面；
   2. 用户在前端触发操作（如转账、购买 NFT、质押代币等）；
   3. 钱包弹出窗口显示交易详情（Gas 费、目标合约、数据），用户确认签名；
   4. 签名的交易被发送到区块链网络（如以太坊）；
   5. 区块链返回交易哈希（Tx Hash），用户可在区块浏览器（如 Etherscan）查看详情；
   6. 用户查询合约数据（如余额、权限）时，DApp 直接调用合约的 view 函数，无需签名和 Gas 费。

3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧
   1. 拒绝盲签；
   2. 小心授权，防止无限授权；
   3. 仔细验证网站的真实性，https证书和域名地址都需要注意。
~                                   
