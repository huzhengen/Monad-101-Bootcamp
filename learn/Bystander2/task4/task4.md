1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

- 合约部分

  event SquarePurchased(uint8 idx, address buyer, uint256 color); //声明事件

  function buySquare(uint8 idx, uint256 color) public payable {
    ...
      // 触发事件
      emit SquarePurchased(idx, msg.sender, color);

  }

- 前端部分

  contract.events.SquarePurchased()
    .on('data', (event) => {
    const { index, buyer, color } = event.returnValues;
    console.log(`🟩 Square ${index} was bought by ${buyer} with color ${color}`);
    })
    .on('error', console.error);

