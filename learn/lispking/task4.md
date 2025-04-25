## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

为实现前端实时更新 UI，合约需添加 SquarePurchased 事件，该事件记录购买者地址、购买方块的索引及颜色。

在 buySquare 函数末尾触发此事件，即 emit SquarePurchased(msg.sender, idx, color)，随后前端监听该事件以更新 UI。

contract.on("SquarePurchased", async (buyer, idx, color) => {
  try {
    await fetchAndUpdateSquares();
  } catch (error) {
    Toast.error('刷新方块颜色时出错:', error);
  }
});

async function fetchAndUpdateSquares() {
  const squareData = await contract.getSquares();
  squareData.forEach((color, index) => {
    const gridCell = cells[index];
    gridCell.style.backgroundColor = `#${color.toString(16)}`;
  });
}

