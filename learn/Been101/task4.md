## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

- 合约中购买格子的方法中抛出事件
- 前端监听事件

```ts
  // 购买格子
    function mint(uint256 x, uint256 y, string memory color) public payable {
      require(x < GRID_SIZE && y < GRID_SIZE, "Coordinates out of bounds");
      require(msg.value >= PRICE, "Insufficient payment");
      require(pixels[x][y].owner == address(0), "Pixel already minted");

      pixels[x][y] = Pixel(color, msg.sender);
      emit PixelInfo(x, y, color, msg.sender);
    }
```

前端监听事件

```ts
contract.on("PixelInfo", (x, y, color, owner) => {
  console.log("Pixel info:", { x, y, color, owner });
  // 执行更新逻辑
});
```

https://youtu.be/Sx6MsUOW9iM
