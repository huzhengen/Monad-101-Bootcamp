## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

   - 首先需要完善下合约，合约需要添加 SquarePurchased 事件的声明，该事件包含三个参数：

     - buyer：购买者的地址（使用 indexed 标记以便更容易过滤）
     - squareIndex：购买的方块索引（使用 indexed 标记）
     - color：设置的颜色值

   - 在 buySquare 函数的最后，添加了事件触发语句 emit SquarePurchased(msg.sender, idx, color)，它会在交易成功完成时发出事件。

   - 这样修改后，每当有人成功购买一个方块时，都会触发这个事件。前端应用程序可以监听这个事件来获取实时的购买通知，用来更新 UI 或显示通知。

   前端调用如下：

   ```js
   // 创建合约实例来监听事件
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const contract = new ethers.Contract(ContractAddress, ContractAbi, provider);

   // 监听合约事件
   contract.on("SquarePurchased", (buyer, idx, color) => {
     if (buyer) {
       getSquares();
     }
   });

   // 渲染页面填充格子
   async function getSquares() {
     const squares = await contract.getSquares();

     for (let i = 0; i < squares.length; i++) {
       const cell = cells[i];
       cell.style.backgroundColor = "#" + squares[i].toString(16);
     }
   }
   ```
