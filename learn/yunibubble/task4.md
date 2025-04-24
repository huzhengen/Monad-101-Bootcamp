1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

合约需要添加 SquarePurchased 事件,记录购买者的地址，购买的方块 index,color
在 buySquare 函数的最后触发事件 emit SquarePurchased(msg.sender, idx, color)
前端监听合约事件更新 ui

```js
async function autoRefreshSquares() {
  // 立即执行一次
  await getSquares();

  // 设置每10秒执行一次
  setInterval(async () => {
    try {
      await getSquares();
    } catch (error) {
      console.error("刷新方块颜色失败:", error);
    }
  }, 10000); // 10000毫秒 = 10秒
}

// 渲染页面填充格子
async function getSquares() {
  const squares = await contract.getSquares();

  for (let i = 0; i < squares.length; i++) {
    const cell = cells[i];
    cell.style.backgroundColor = "#" + squares[i].toString(16);
  }
}
```
