## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

课程作业地址：https://pixel-grid-chain.vercel.app/

合约代码：定义事件，购买的时候 emit 事件
```solidity
event EarthPurchased(
    uint256 indexed idx,
    string color,
    string image_url,
    address owner,
    uint price
);

emit EarthPurchased(_idx, color, imageUrl, msg.sender, msg.value);
```
前端代码：监听事件，更新 UI
```javascript
const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  signer
)
const filter = contract.filters.EarthPurchased();
const listener = (idx, color, image_url, owner, price) => {
    console.log("检测到新的EarthPurchased事件:", { idx, color, image_url, owner, price });
    setEventData({ idx, color, image_url, owner, price });
    // 当事件触发时刷新数据
    refetch();
};

// 添加事件监听器
contract.on(filter, listener);
```