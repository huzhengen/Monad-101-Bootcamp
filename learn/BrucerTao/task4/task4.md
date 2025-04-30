## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码


通过增加合约中的emit SquareBought触发事件，然后前端js可以查询合约接口方式来监听更新，核心代码块如提交index.html中的
'''contract.events.SquareBought({
    fromBlock: 'latest'
}, function(error, event) {
    if (error) {
        console.error('监听事件错误:', error);
        return;
    }
    console.log('监听到方块购买事件:', event);
    // 更新UI
    getSquare();
});
'''
