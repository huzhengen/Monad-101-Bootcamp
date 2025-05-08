## 第四章：Web3 前端 101Change

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

增加一个emit触发事件，前端可以通过查询合约接口方式来监听更新，核心代码块如下：

```
contract.events.SquareSold({
    fromBlock: 'latest'
}, function(error, event) {
    if (error) {
        console.error('监听事件错误:', error);
        return;
    }
    console.log('像素格子售出事件:', event);
    // 更新UI
    getSquare();
});
```
