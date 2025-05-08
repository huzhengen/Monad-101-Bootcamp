## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

   ##### 合约部分在别人购买了像素格子的时候，发出事件

   ``````solidity
   event CellFilled(uint x, uint y, uint32 color);
   
   emit CellFilled(x, y, color);
   ``````

   ##### 前端部分，监听事件，更新UI

   ``````typescript
   useWatchContractEvent({
       ...pixelContractConfig,
       eventName: "CellFilled",
       onLogs(logs) {
         console.log("new log ", logs[0].args);
         const { x, y, color } = logs[0].args;
         updatePixel(Number(x), Number(y), Number(color));
       },
       onError(error) {
         console.error("Error watching event:", error);
       },
     });
   
   const updatePixel = (x: number, y: number, color: number) => {
       setPixels((prev) => {
         const newPixels = [...prev];
         if (!newPixels[x]) newPixels[x] = [];
         newPixels[x][y] = color;
         return newPixels;
       });
     };
   ``````

   
