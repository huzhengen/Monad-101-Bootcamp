## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

在合约侧,需要定义购买事件，并在购买函数中emit该事件:
```solidity

// 像素格子购买事件，包含颜色信息
event PixelPurchased(
    uint256 indexed pixelId,    // 格子ID
    address indexed buyer,      // 购买者地址
    uint256 price,              // 购买价格
    string color                // 设置的颜色（十六进制颜色代码如"#FF0000"）
);

// 简化的像素格子购买函数
function buyPixel(uint256 _pixelId, string memory _color) public payable {
    require(msg.value >= pixelPrice, "Insufficient payment");
    require(_pixelId < TOTAL_PIXELS, "Invalid pixel ID");
    require(bytes(_color).length > 0, "Color cannot be empty");
    
    // 记录所有权和颜色
    pixels[_pixelId] = Pixel({
        owner: msg.sender,
        color: _color,
        price: msg.value
    });
    
    // 触发事件，包含所有相关信息
    emit PixelPurchased(_pixelId, msg.sender, msg.value, _color);
}

```

前端:

通过infra服务商提供的WebSocket连接实时接收事件数据

```javascript

// 创建标准HTTP提供者连接到Monad测试网
const provider = new ethers.providers.JsonRpcProvider(MONAD_RPC_URL);

// 初始化合约实例
const contract = new ethers.Contract(CONTRACT_ADDRESS, minimalABI, provider);


// 设置轮询间隔
const interval = setInterval(async () => {
  // 获取当前区块
  const currentBlock = await provider.getBlockNumber();
  
  // 如果有新区块
  if (currentBlock > lastBlock) {
    // 查询新事件
    const filter = contract.filters.PixelPurchased();
    const newEvents = await contract.queryFilter(filter, lastBlock + 1, currentBlock);
    
    newEvents.forEach(event => {
        // 解析事件数据
        const [pixelId, buyer, price, color] = event.args;
        const id = pixelId.toNumber();
        
        // 更新像素状态
        updatedPixels[id] = {
            owner: buyer,
            price: ethers.utils.formatEther(price),
            color: color
        };
    });

    // 更新React状态
    setPixels(updatedPixels);
    
    // 更新最后检查的区块
    setLastBlock(currentBlock);
  }
}, 5000); // 每5秒检查一次


```