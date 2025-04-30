## 简单描述一下本地开发、部署合约的流程

- hardhat.config.ts

```ts
 monadTestnet: {
      url: "https://testnet-rpc.monad.xyz/",
      chainId: 10143,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
```

- npx hardhat compile

添加部署脚本

```ts
// 获取部署者账户
const deployer = new ethers.Wallet(process.env.PRIVATE_KEY);
console.log("Deploying contracts with the account:", deployer.address);

// 获取合约工厂
const MonadPixel = await ethers.getContractFactory("MonadPixel");

// 部署合约
console.log("Deploying MonadPixel contract...");
const monadPixel = await MonadPixel.deploy();

// 等待部署完成
console.log("Waiting for deployment confirmation...");
await monadPixel.waitForDeployment();

// 获取合约地址
const address = await monadPixel.getAddress();
console.log("MonadPixel deployed to:", address);
```

- npx hardhat run scripts/deploy.ts --network monadTestnet

## 简单描述一下用户在使用一个 DApp 时与合约交互的流程

- 获取合约部署后的地址添加到环境变量
- 添加合约的 ABI 文件
- 引入 ethers 三方库
- 初始化合约

```ts
// 初始化合约
const ethersProvider = new ethers.BrowserProvider(window.ethereum);
const signer = await ethersProvider.getSigner();
const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  MonadPixelABI,
  signer
) as unknown as MonadPixel;
```

- 通过合约调用合约相应的方法

```ts
// 获取全部格子的像素
const allPixels = await contract.getAllPixels();
// 获取单个格子的像素
const pixelData = await contract.getPixel(
  selectedPixel % GRID_SIZE,
  Math.floor(selectedPixel / GRID_SIZE)
);
```

## 通读「区块链黑暗森林自救手册」，列出你觉得最重要的三个安全技巧

- 私钥安全：绝对离线存储，杜绝数字暴露
- 交易安全：验证一切，防范“钓鱼”和中间人攻击
- 合约安全：谨慎授权，避免“无限授权”陷阱
