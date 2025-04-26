## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

通过订阅合约的 event 广播及时更新合约状态：

-   WebSocket
-   http 轮询

本场景中，转账无附加数据，索引和颜色均为参数
```solidity
(bool sent,) = owner.call{value: msg.value}("") 
```
转账事件中无法获取实际改变格子的位置及颜色，所以执行重新拉取即可

```jsx
import { useWatchContractEvent } from "wagmi"
import { abi } from "./abi"

function App() {
	useWatchContractEvent({
        // 公链地址
		address: "0x6b175474e89094c44da98b954eedeac495271d0f",
		abi,
		args: {
            // 限定收款合约地址
			to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
		},
		eventName: "Transfer", // 限定转账事件
		onLogs(logs) {

            // ⭐️ 此处重新执行getSquare()即可
            
			console.log("Received logs:", logs)

			// 提取事件的参数
			const from = logs[0].args.from
			const to = logs[0].args.to
			const value = ethers.utils.formatEther(logs[0].args.value) // 转换为以太币单位
			const data = ethers.utils.toUtf8String(logs[0].args.data) // 假设 `data` 是字符串类型

			console.log(`Transfer detected! From: ${from}, To: ${to}, Value: ${value} ETH, Data: ${data}`)


		},
	})
}
```
