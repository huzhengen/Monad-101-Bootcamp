## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

合约中添加emit事件进行 购买事件的推送
、、、
event SquareBought(address buyer,uint8 index,uint256 color);
emit SquareBought(msg.sender, idx, color);
、、、

前端补充监听事件的代码
、、、
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));
    contract.events.SquareBought({
        fromBlock: 'latest' // 从最新的区块开始监听
    }, function(error, event){
        if (error) {
            console.error("Event error:", error);
            return;
        }
        console.log("SquareBought event received:", event);
        const index = event.returnValues.index;
        const color = event.returnValues.color;
        if (cells[index]) {
            const colorHex = parseInt(color).toString(16).padStart(6, '0');
            cells[index].style.backgroundColor = '#' + colorHex;
            console.log(`Pixel ${index} updated to color #${colorHex}`);
        }
    });

、、、