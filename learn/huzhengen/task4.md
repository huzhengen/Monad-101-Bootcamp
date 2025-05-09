## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

合约代码

```solidity
event BuySquare(address indexed buyer, uint indexed idx, uint color);

function buySquare(uint idx, uint color) public payable {
  ...
  emit BuySquare(msg.sender, idx, color);
}
```

前端代码

```tsx
contract.events.BuySquare()
  .on('data', (event: any) => {
    const { buyer, idx, color } = event.returnValues;
    handleBuySquare(buyer, idx, color);
  })
```