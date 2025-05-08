## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

### 如何监听合约事件
使用 events 就可以监听合约事件

### 当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI 
```
// 1. 监听实时购买事件
function listenToPixelPurchases() {
    console.log("开始监听像素购买事件...");
    
    pixelContract.events.PixelPurchased({
        fromBlock: 'latest'
    })
    .on('data', function(event) {
        const { buyer, x, y, color, timestamp } = event.returnValues;
        
        console.log(`像素 (${x},${y}) 被 ${buyer} 购买，颜色设置为: ${color}`);
        
        // 更新UI
        updatePixelInUI(x, y, color, buyer);
    })
    .on('error', function(error) {
        console.error("事件监听发生错误:", error);
        // 实现重新连接逻辑
        setTimeout(listenToPixelPurchases, 5000);
    });
}
```
