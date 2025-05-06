## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

在合约中需要添加购买事件的代码，在用户购买成功后触发

```solidity
// 定义事件
event SquarePurchased(uint8 indexed idx, uint color, address buyer);

function buySquare(uint8 idx, uint color) public payable {
  // 购买
  // 触发事件
  emit SquarePurchased(idx, color, msg.sender);
}
```

在前端代码中监听该事件，更新ui

```js
// 监听购买事件
contract.events.SquarePurchased()
  .on('data', (event) => {
    console.log('新格子被购买:', event.returnValues);
    const { idx, color } = event.returnValues;
    // 更新UI
    const pixel = grid.children[idx];
    if (pixel) {
      pixel.style.backgroundColor = `#${parseInt(color).toString(16)}`;
    }
  })
  .on('error', (error) => {
    console.error('事件监听错误:', error);
  });
```