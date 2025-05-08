## 第一章：走进 Web3 世界

1. 简单描述一下本地开发、部署合约的流程
- 准备环境，例如Node.js环境，Truffle全局安装，Ganache本地测试链，MetaMask以及测试币
- 初始化Truffle项目 truffle init
- 在contracts/下创建MyContract.sol
- 修改truffle-config.js，设置网络（如 Goerli），同时配置环境变量，如私钥，Infura API Key   
- 编译合约truffle compile
- 使用deploy方法进行部署合约，部署到本地truffle migrate --network development                                                       

2. 简单描述一下用户在使用一个 DApp 时与合约交互的流程                                                
- 连接钱包 await window.ethereum.request({ method: "eth_requestAccounts" });授权链接之后，获取到钱包地址
- 可进行读取余额数据，也可以进行发送交易（需Gas），钱包会进行确认交易详情（金额、Gas 费），签名并广播交易，交易上链后返回结果。
 
3. 通读[「区块链黑暗森林自救手册」](https://github.com/slowmist/Blockchain-dark-forest-selfguard-handbook/blob/main/README_CN.md)，列出你觉得最重要的三个安全技巧 
- 对任何事情都零信任和保持怀疑的对待
- 私钥和助记词要妥善保管
- 使用钱包时, 要仔细检查交易信息, 比如交易金额, 交易地址等