## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

- 通过在合约中添加购买事件, 执行 bugSquare 方法成功后 emit 事件
- 前端通过监听事件, 做相应的处理

```ts
publicClient.watchContractEvent({
  address: contractAddress,
  abi: contractAbi,
  eventName: 'SquarePurchased',
  onLogs: (logs) => {
    // Do something...
  },
});
```
